namespace CSUC.Registration.Application.Features.Registrations.DTOs;

/// <summary>
/// Data transfer object for paged results.
/// </summary>
public sealed record PagedResultDto<T>(
    IReadOnlyList<T> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages);
