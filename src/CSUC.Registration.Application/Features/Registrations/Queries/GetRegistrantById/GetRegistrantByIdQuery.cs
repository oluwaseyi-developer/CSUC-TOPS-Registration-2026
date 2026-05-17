using CSUC.Registration.Application.Common;
using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantById;

/// <summary>
/// Query to get a registrant by ID.
/// </summary>
public sealed record GetRegistrantByIdQuery(Guid Id) : IRequest<Result<RegistrantDto>>;
