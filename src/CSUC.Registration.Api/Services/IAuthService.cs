namespace CSUC.Registration.Api.Services;

public interface IAuthService
{
    Task<AuthResult> LoginAsync(string username, string password);
    bool ValidateToken(string token);
}

public record AuthResult(bool Success, string? Token, string? Error);
