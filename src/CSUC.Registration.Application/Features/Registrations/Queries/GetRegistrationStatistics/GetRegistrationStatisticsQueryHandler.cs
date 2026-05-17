using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Domain.Enums;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrationStatistics;

/// <summary>
/// Handler for GetRegistrationStatisticsQuery.
/// </summary>
public sealed class GetRegistrationStatisticsQueryHandler
    : IRequestHandler<GetRegistrationStatisticsQuery, RegistrationStatisticsDto>
{
    private readonly IRegistrantRepository _registrantRepository;

    public GetRegistrationStatisticsQueryHandler(IRegistrantRepository registrantRepository)
    {
        _registrantRepository = registrantRepository;
    }

    public async Task<RegistrationStatisticsDto> Handle(
        GetRegistrationStatisticsQuery request,
        CancellationToken cancellationToken)
    {
        var registrations = await _registrantRepository.GetAllAsync(cancellationToken);

        return new RegistrationStatisticsDto(
            TotalRegistrations: registrations.Count,
            MaleCount: registrations.Count(r => r.Sex == Gender.Male),
            FemaleCount: registrations.Count(r => r.Sex == Gender.Female),
            NeedAccommodation: registrations.Count(r => r.NeedsAccommodation),
            ComingAlone: registrations.Count(r => r.ComingWith == CompanionType.Alone),
            ComingWithBrethren: registrations.Count(r => r.ComingWith == CompanionType.WithBrethren),
            ComingWithFamily: registrations.Count(r => r.ComingWith == CompanionType.WithFamily),
            TotalExpectedAttendees: registrations.Sum(r => 1 + r.NumberOfPersons),
            TransportationBreakdown: new TransportationBreakdownDto(
                PublicTransport: registrations.Count(r => r.MeansOfTransportation == TransportationType.PublicTransport),
                PrivateVehicle: registrations.Count(r => r.MeansOfTransportation == TransportationType.PrivateVehicle),
                JoinTheBrethren: registrations.Count(r => r.MeansOfTransportation == TransportationType.JoinTheBrethren)));
    }
}
