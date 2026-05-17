using CSUC.Registration.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace CSUC.Registration.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Login with admin credentials.
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { error = "Username and password are required" });
        }

        var result = await _authService.LoginAsync(request.Username, request.Password);

        if (!result.Success)
        {
            return Unauthorized(new { error = result.Error });
        }

        return Ok(new LoginResponse(result.Token!, DateTime.UtcNow.AddHours(8)));
    }

    /// <summary>
    /// Validate the current token.
    /// </summary>
    [HttpGet("validate")]
    [Authorize]
    public IActionResult ValidateToken()
    {
        return Ok(new { valid = true, user = User.Identity?.Name });
    }
}

public class LoginRequest
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = string.Empty;

    [JsonPropertyName("password")]
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    [JsonPropertyName("token")]
    public string Token { get; set; }

    [JsonPropertyName("expiresAt")]
    public DateTime ExpiresAt { get; set; }

    public LoginResponse(string token, DateTime expiresAt)
    {
        Token = token;
        ExpiresAt = expiresAt;
    }
}
