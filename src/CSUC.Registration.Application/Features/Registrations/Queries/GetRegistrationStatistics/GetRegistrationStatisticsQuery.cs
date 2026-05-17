using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrationStatistics;

/// <summary>
/// Query to get registration statistics.
/// </summary>
public sealed record GetRegistrationStatisticsQuery : IRequest<RegistrationStatisticsDto>;
