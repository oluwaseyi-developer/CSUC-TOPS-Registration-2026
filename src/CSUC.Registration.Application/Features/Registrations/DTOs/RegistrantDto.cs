namespace CSUC.Registration.Application.Features.Registrations.DTOs;

/// <summary>
/// Data transfer object for registrant information.
/// </summary>
public sealed record RegistrantDto(
    Guid Id,
    string FullName,
    string Sex,
    string Email,
    string PhoneNumber,
    string LocationState,
    string Expectations,
    bool NeedsAccommodation,
    string MeansOfTransportation,
    string ComingWith,
    int NumberOfPersons,
    DateTime RegisteredAt);
