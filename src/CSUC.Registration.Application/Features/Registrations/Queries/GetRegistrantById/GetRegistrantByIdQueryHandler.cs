using CSUC.Registration.Application.Common;
using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Application.Features.Registrations.Mappings;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantById;

/// <summary>
/// Handler for GetRegistrantByIdQuery.
/// </summary>
public sealed class GetRegistrantByIdQueryHandler
    : IRequestHandler<GetRegistrantByIdQuery, Result<RegistrantDto>>
{
    private readonly IRegistrantRepository _registrantRepository;

    public GetRegistrantByIdQueryHandler(IRegistrantRepository registrantRepository)
    {
        _registrantRepository = registrantRepository;
    }

    public async Task<Result<RegistrantDto>> Handle(
        GetRegistrantByIdQuery request,
        CancellationToken cancellationToken)
    {
        var registrant = await _registrantRepository.GetByIdAsync(request.Id, cancellationToken);

        if (registrant is null)
        {
            return Result<RegistrantDto>.Failure("Registration not found");
        }

        return Result<RegistrantDto>.Success(registrant.ToDto());
    }
}
