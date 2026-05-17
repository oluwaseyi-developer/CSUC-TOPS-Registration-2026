using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetFormOptions;

/// <summary>
/// Query to get form dropdown options.
/// </summary>
public sealed record GetFormOptionsQuery : IRequest<FormOptionsDto>;
