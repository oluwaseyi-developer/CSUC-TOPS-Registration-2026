using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Domain.Entities;
using CSUC.Registration.Domain.Enums;

namespace CSUC.Registration.Application.Features.Registrations.Mappings;

/// <summary>
/// Extension methods for mapping Registrant entities to DTOs.
/// </summary>
public static class RegistrantMappings
{
    public static RegistrantDto ToDto(this Registrant registrant)
    {
        return new RegistrantDto(
            registrant.Id,
            registrant.FullName,
            registrant.Sex.ToDisplayString(),
            registrant.Email,
            registrant.PhoneNumber,
            registrant.LocationState,
            registrant.Expectations,
            registrant.NeedsAccommodation,
            registrant.MeansOfTransportation.ToDisplayString(),
            registrant.ComingWith.ToDisplayString(),
            registrant.NumberOfPersons,
            registrant.RegisteredAt);
    }

    public static IReadOnlyList<RegistrantDto> ToDtoList(this IEnumerable<Registrant> registrants)
    {
        return registrants.Select(r => r.ToDto()).ToList();
    }

    private static string ToDisplayString(this Gender gender) => gender switch
    {
        Gender.Male => "Male",
        Gender.Female => "Female",
        _ => "Unknown"
    };

    private static string ToDisplayString(this TransportationType transportation) => transportation switch
    {
        TransportationType.PublicTransport => "Public Transport",
        TransportationType.PrivateVehicle => "Private Vehicle",
        TransportationType.JoinTheBrethren => "Join the Brethren",
        _ => "Unknown"
    };

    private static string ToDisplayString(this CompanionType companion) => companion switch
    {
        CompanionType.Alone => "Alone",
        CompanionType.WithBrethren => "With Brethren",
        CompanionType.WithFamily => "With Family",
        _ => "Unknown"
    };
}
