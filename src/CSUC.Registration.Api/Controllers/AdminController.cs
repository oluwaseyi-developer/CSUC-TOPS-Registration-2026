using CSUC.Registration.Api.Contracts.Mappings;
using CSUC.Registration.Api.Contracts.Requests;
using CSUC.Registration.Api.Contracts.Responses;
using CSUC.Registration.Api.Extensions;
using CSUC.Registration.Application.Features.Registrations.Commands.DeleteRegistration;
using CSUC.Registration.Application.Features.Registrations.Commands.ImportRegistrations;
using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Application.Features.Registrations.Queries.GetAllRegistrants;
using CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantById;
using CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrationStatistics;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CSUC.Registration.Api.Controllers;

/// <summary>
/// Controller for admin endpoints to manage registrations.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
[Authorize]
public sealed class AdminController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Gets all registrations with pagination and search.
    /// </summary>
    [HttpGet("registrations")]
    [ProducesResponseType(typeof(ApiResponse<PagedResultDto<RegistrantDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRegistrations(
        [FromQuery] PaginationRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request.ToQuery(), cancellationToken);
        return Ok(ApiResponse<PagedResultDto<RegistrantDto>>.SuccessResponse(result));
    }

    /// <summary>
    /// Gets all registrations without pagination.
    /// </summary>
    [HttpGet("registrations/all")]
    [ProducesResponseType(typeof(ApiResponse<IReadOnlyList<RegistrantDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllRegistrations(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetAllRegistrantsQuery(), cancellationToken);
        return Ok(ApiResponse<IReadOnlyList<RegistrantDto>>.SuccessResponse(result));
    }

    /// <summary>
    /// Gets a specific registration by ID.
    /// </summary>
    [HttpGet("registrations/{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<RegistrantDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRegistrationById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRegistrantByIdQuery(id), cancellationToken);
        return result.ToNotFoundOrOk();
    }

    /// <summary>
    /// Deletes a registration.
    /// </summary>
    [HttpDelete("registrations/{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteRegistration(Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteRegistrationCommand(id), cancellationToken);
        return result.ToNotFoundOrOk("Registration deleted successfully");
    }

    /// <summary>
    /// Gets registration statistics.
    /// </summary>
    [HttpGet("statistics")]
    [ProducesResponseType(typeof(ApiResponse<RegistrationStatisticsDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetStatistics(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRegistrationStatisticsQuery(), cancellationToken);
        return Ok(ApiResponse<RegistrationStatisticsDto>.SuccessResponse(result));
    }

    /// <summary>
    /// Export all registrations as JSON for backup.
    /// </summary>
    [HttpGet("export")]
    [ProducesResponseType(typeof(FileContentResult), StatusCodes.Status200OK)]
    public async Task<IActionResult> ExportData(CancellationToken cancellationToken)
    {
        var registrations = await _mediator.Send(new GetAllRegistrantsQuery(), cancellationToken);
        var json = System.Text.Json.JsonSerializer.Serialize(registrations, new System.Text.Json.JsonSerializerOptions
        {
            WriteIndented = true
        });
        var bytes = System.Text.Encoding.UTF8.GetBytes(json);
        var fileName = $"registrations_backup_{DateTime.UtcNow:yyyy-MM-dd_HHmmss}.json";
        return File(bytes, "application/json", fileName);
    }

    /// <summary>
    /// Import registrations from JSON backup.
    /// </summary>
    [HttpPost("import")]
    [ProducesResponseType(typeof(ApiResponse<int>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ImportData([FromBody] List<RegistrantDto> registrations, CancellationToken cancellationToken)
    {
        if (registrations == null || registrations.Count == 0)
        {
            return BadRequest(ApiResponse.FailureResponse("No registrations provided"));
        }

        var importedCount = await _mediator.Send(new ImportRegistrationsCommand(registrations), cancellationToken);
        return Ok(ApiResponse<int>.SuccessResponse(importedCount, $"Successfully imported {importedCount} registrations"));
    }
}
