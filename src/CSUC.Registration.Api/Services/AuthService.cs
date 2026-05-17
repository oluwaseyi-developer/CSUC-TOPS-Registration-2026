using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CSUC.Registration.Api.Services;

public sealed class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly string _adminUsername;
    private readonly string _adminPasswordHash;
    private readonly string _jwtKey;
    private readonly string _jwtIssuer;
    private readonly string _jwtAudience;
    private readonly int _expiryHours;

    // Default password is "Admin@TOPS2026" - should be changed in production via environment variable
    private const string DefaultPasswordHash = "$2a$11$rKN5v3rX8LZ5V5P5P5P5P.5P5P5P5P5P5P5P5P5P5P5P5P5P5P5P5u";

    public AuthService(IConfiguration configuration)
    {
        _configuration = configuration;
        _adminUsername = configuration["Admin:Username"] ?? "admin";
        _adminPasswordHash = configuration["Admin:PasswordHash"] ?? string.Empty;
        _jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured");
        _jwtIssuer = configuration["Jwt:Issuer"] ?? "CSUC.Registration.Api";
        _jwtAudience = configuration["Jwt:Audience"] ?? "CSUC.Registration.Frontend";
        _expiryHours = int.TryParse(configuration["Jwt:ExpiryHours"], out var hours) ? hours : 8;
    }

    public Task<AuthResult> LoginAsync(string username, string password)
    {
        // Validate username
        if (!string.Equals(username, _adminUsername, StringComparison.OrdinalIgnoreCase))
        {
            return Task.FromResult(new AuthResult(false, null, "Invalid credentials"));
        }

        // Validate password
        bool isValidPassword;

        if (string.IsNullOrEmpty(_adminPasswordHash))
        {
            // If no hash is configured, use default password "Admin@TOPS2026"
            isValidPassword = password == "Admin@TOPS2026";
        }
        else
        {
            // Use BCrypt to verify password
            try
            {
                isValidPassword = BCrypt.Net.BCrypt.Verify(password, _adminPasswordHash);
            }
            catch
            {
                isValidPassword = false;
            }
        }

        if (!isValidPassword)
        {
            return Task.FromResult(new AuthResult(false, null, "Invalid credentials"));
        }

        // Generate JWT token
        var token = GenerateJwtToken(username);
        return Task.FromResult(new AuthResult(true, token, null));
    }

    public bool ValidateToken(string token)
    {
        if (string.IsNullOrEmpty(token))
            return false;

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtKey);

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _jwtIssuer,
                ValidateAudience = true,
                ValidAudience = _jwtAudience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out _);

            return true;
        }
        catch
        {
            return false;
        }
    }

    private string GenerateJwtToken(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, "Admin"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
        };

        var token = new JwtSecurityToken(
            issuer: _jwtIssuer,
            audience: _jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(_expiryHours),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
