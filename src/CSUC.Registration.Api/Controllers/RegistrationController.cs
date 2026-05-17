using CSUC.Registration.Api.Contracts.Mappings;
using CSUC.Registration.Api.Contracts.Requests;
using CSUC.Registration.Api.Contracts.Responses;
using CSUC.Registration.Api.Extensions;
using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Application.Features.Registrations.Queries.GetFormOptions;
using CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CSUC.Registration.Api.Controllers;

/// <summary>
/// Controller for public registration endpoints.
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public sealed class RegistrationController : ControllerBase
{
    private readonly IMediator _mediator;

    public RegistrationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Creates a new registration for the Covenant Service 2026.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<Guid>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register(
        [FromBody] CreateRegistrationRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request.ToCommand(), cancellationToken);

        return result.ToCreatedResult(
            nameof(GetById),
            null!,
            id => new { id },
            "Registration successful! We look forward to seeing you at the Covenant Service 2026.");
    }

    /// <summary>
    /// Gets a registration by ID.
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<RegistrantDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRegistrantByIdQuery(id), cancellationToken);
        return result.ToNotFoundOrOk();
    }

    /// <summary>
    /// <summary>
    /// Gets the available options for registration form dropdowns.
    /// </summary>
    [HttpGet("options")]
    [ProducesResponseType(typeof(ApiResponse<FormOptionsDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetFormOptions(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetFormOptionsQuery(), cancellationToken);
        return Ok(ApiResponse<FormOptionsDto>.SuccessResponse(result));
    }
}
