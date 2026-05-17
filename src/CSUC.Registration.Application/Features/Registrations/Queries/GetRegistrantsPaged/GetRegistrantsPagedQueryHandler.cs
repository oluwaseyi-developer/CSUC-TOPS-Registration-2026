using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Application.Features.Registrations.Mappings;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantsPaged;

/// <summary>
/// Handler for GetRegistrantsPagedQuery.
/// </summary>
public sealed class GetRegistrantsPagedQueryHandler
    : IRequestHandler<GetRegistrantsPagedQuery, PagedResultDto<RegistrantDto>>
{
    private readonly IRegistrantRepository _registrantRepository;

    public GetRegistrantsPagedQueryHandler(IRegistrantRepository registrantRepository)
    {
        _registrantRepository = registrantRepository;
    }

    public async Task<PagedResultDto<RegistrantDto>> Handle(
        GetRegistrantsPagedQuery request,
        CancellationToken cancellationToken)
    {
        var page = request.Page < 1 ? 1 : request.Page;
        var pageSize = request.PageSize < 1 ? 10 : request.PageSize;

        var registrants = await _registrantRepository.GetPagedAsync(
            page,
            pageSize,
            request.SearchTerm,
            cancellationToken);

        var totalCount = await _registrantRepository.GetTotalCountAsync(
            request.SearchTerm,
            cancellationToken);

        var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

        return new PagedResultDto<RegistrantDto>(
            registrants.ToDtoList(),
            totalCount,
            page,
            pageSize,
            totalPages);
    }
}
