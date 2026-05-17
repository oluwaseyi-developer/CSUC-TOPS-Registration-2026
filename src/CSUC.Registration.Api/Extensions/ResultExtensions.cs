using CSUC.Registration.Api.Contracts.Responses;
using CSUC.Registration.Application.Common;
using Microsoft.AspNetCore.Mvc;

namespace CSUC.Registration.Api.Extensions;

/// <summary>
/// Extension methods for converting Result to ActionResult.
/// </summary>
public static class ResultExtensions
{
    public static IActionResult ToActionResult<T>(this Result<T> result, string? successMessage = null)
    {
        if (result.IsFailure)
        {
            return new BadRequestObjectResult(ApiResponse<T>.FailureResponse(result.Error));
        }

        return new OkObjectResult(ApiResponse<T>.SuccessResponse(result.Value!, successMessage ?? "Success"));
    }

    public static IActionResult ToCreatedResult<T>(
        this Result<T> result,
        string actionName,
        string controllerName,
        Func<T, object> routeValuesFactory,
        string? successMessage = null)
    {
        if (result.IsFailure)
        {
            return new BadRequestObjectResult(ApiResponse<T>.FailureResponse(result.Error));
        }

        return new CreatedAtActionResult(
            actionName,
            controllerName,
            routeValuesFactory(result.Value!),
            ApiResponse<T>.SuccessResponse(result.Value!, successMessage ?? "Created successfully"));
    }

    public static IActionResult ToNotFoundOrOk<T>(this Result<T> result, string? successMessage = null)
    {
        if (result.IsFailure)
        {
            return new NotFoundObjectResult(ApiResponse<T>.FailureResponse(result.Error));
        }

        return new OkObjectResult(ApiResponse<T>.SuccessResponse(result.Value!, successMessage ?? "Success"));
    }

    public static IActionResult ToNotFoundOrOk(this Result<bool> result, string? successMessage = null)
    {
        if (result.IsFailure)
        {
            return new NotFoundObjectResult(ApiResponse.FailureResponse(result.Error));
        }

        return new OkObjectResult(ApiResponse.SuccessResponse(successMessage ?? "Success"));
    }
}
