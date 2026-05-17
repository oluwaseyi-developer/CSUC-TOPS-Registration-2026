using CSUC.Registration.Application.Common;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Commands.DeleteRegistration;

/// <summary>
/// Command to delete a registration.
/// </summary>
public sealed record DeleteRegistrationCommand(Guid Id) : IRequest<Result<bool>>;
