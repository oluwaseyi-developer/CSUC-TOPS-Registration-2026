namespace CSUC.Registration.Api.Contracts.Responses;

/// <summary>
/// Standard API response wrapper.
/// </summary>
public sealed class ApiResponse<T>
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
    public T? Data { get; init; }
    public IEnumerable<string>? Errors { get; init; }

    public static ApiResponse<T> SuccessResponse(T data, string message = "Success")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data
        };
    }

    public static ApiResponse<T> FailureResponse(string message, IEnumerable<string>? errors = null)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Errors = errors
        };
    }
}

/// <summary>
/// Standard API response without data.
/// </summary>
public sealed class ApiResponse
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
    public IEnumerable<string>? Errors { get; init; }

    public static ApiResponse SuccessResponse(string message = "Success")
    {
        return new ApiResponse
        {
            Success = true,
            Message = message
        };
    }

    public static ApiResponse FailureResponse(string message, IEnumerable<string>? errors = null)
    {
        return new ApiResponse
        {
            Success = false,
            Message = message,
            Errors = errors
        };
    }
}
