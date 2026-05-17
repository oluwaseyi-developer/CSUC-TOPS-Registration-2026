using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Application.Features.Registrations.Mappings;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetAllRegistrants;

/// <summary>
/// Handler for GetAllRegistrantsQuery.
/// </summary>
public sealed class GetAllRegistrantsQueryHandler
    : IRequestHandler<GetAllRegistrantsQuery, IReadOnlyList<RegistrantDto>>
{
    private readonly IRegistrantRepository _registrantRepository;

    public GetAllRegistrantsQueryHandler(IRegistrantRepository registrantRepository)
    {
        _registrantRepository = registrantRepository;
    }

    public async Task<IReadOnlyList<RegistrantDto>> Handle(
        GetAllRegistrantsQuery request,
        CancellationToken cancellationToken)
    {
        var registrants = await _registrantRepository.GetAllAsync(cancellationToken);
        return registrants.ToDtoList();
    }
}
