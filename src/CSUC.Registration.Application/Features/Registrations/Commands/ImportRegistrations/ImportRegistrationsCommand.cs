using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Commands.ImportRegistrations;

/// <summary>
/// Command to import registrations from backup.
/// </summary>
public sealed record ImportRegistrationsCommand(List<RegistrantDto> Registrations) : IRequest<int>;
