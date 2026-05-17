using System.Net;
using System.Text.Json;
using CSUC.Registration.Api.Contracts.Responses;
using FluentValidation;

namespace CSUC.Registration.Api.Middleware;

/// <summary>
/// Global exception handling middleware.
/// </summary>
public sealed class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, response) = exception switch
        {
            ValidationException validationException => (
                HttpStatusCode.BadRequest,
                ApiResponse.FailureResponse(
                    "Validation failed",
                    validationException.Errors.Select(e => e.ErrorMessage))),

            ArgumentException argumentException => (
                HttpStatusCode.BadRequest,
                ApiResponse.FailureResponse(argumentException.Message)),

            KeyNotFoundException => (
                HttpStatusCode.NotFound,
                ApiResponse.FailureResponse("Resource not found")),

            UnauthorizedAccessException => (
                HttpStatusCode.Unauthorized,
                ApiResponse.FailureResponse("Unauthorized access")),

            _ => (
                HttpStatusCode.InternalServerError,
                ApiResponse.FailureResponse("An unexpected error occurred"))
        };

        if (statusCode == HttpStatusCode.InternalServerError)
        {
            _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);
        }
        else
        {
            _logger.LogWarning("Request failed with {StatusCode}: {Message}", statusCode, exception.Message);
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}

/// <summary>
/// Extension method for adding the exception handling middleware.
/// </summary>
public static class ExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseExceptionHandling(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
