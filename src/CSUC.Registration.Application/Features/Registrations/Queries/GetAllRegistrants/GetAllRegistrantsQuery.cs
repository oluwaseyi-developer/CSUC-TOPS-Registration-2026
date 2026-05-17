using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetAllRegistrants;

/// <summary>
/// Query to get all registrants.
/// </summary>
public sealed record GetAllRegistrantsQuery : IRequest<IReadOnlyList<RegistrantDto>>;
