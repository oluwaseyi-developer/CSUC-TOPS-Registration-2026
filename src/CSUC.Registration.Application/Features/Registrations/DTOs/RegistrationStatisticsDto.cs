namespace CSUC.Registration.Application.Features.Registrations.DTOs;

/// <summary>
/// Data transfer object for registration statistics.
/// </summary>
public sealed record RegistrationStatisticsDto(
    int TotalRegistrations,
    int MaleCount,
    int FemaleCount,
    int NeedAccommodation,
    int ComingAlone,
    int ComingWithBrethren,
    int ComingWithFamily,
    int TotalExpectedAttendees,
    TransportationBreakdownDto TransportationBreakdown);

public sealed record TransportationBreakdownDto(
    int PublicTransport,
    int PrivateVehicle,
    int JoinTheBrethren);
