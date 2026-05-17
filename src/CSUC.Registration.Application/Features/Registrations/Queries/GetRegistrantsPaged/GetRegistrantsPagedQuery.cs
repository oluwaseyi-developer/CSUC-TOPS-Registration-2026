using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantsPaged;

/// <summary>
/// Query to get paged registrants with optional search.
/// </summary>
public sealed record GetRegistrantsPagedQuery(
    int Page = 1,
    int PageSize = 10,
    string? SearchTerm = null) : IRequest<PagedResultDto<RegistrantDto>>;
