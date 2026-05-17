using CSUC.Registration.Application.Common;
using CSUC.Registration.Domain.Enums;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Commands.CreateRegistration;

/// <summary>
/// Command to create a new registration.
/// </summary>
public sealed record CreateRegistrationCommand(
    string FullName,
    Gender Sex,
    string Email,
    string PhoneNumber,
    string LocationState,
    string Expectations,
    bool NeedsAccommodation,
    TransportationType MeansOfTransportation,
    CompanionType ComingWith,
    int NumberOfPersons) : IRequest<Result<Guid>>;
