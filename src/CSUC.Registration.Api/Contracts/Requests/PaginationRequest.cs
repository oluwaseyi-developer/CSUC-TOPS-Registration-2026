namespace CSUC.Registration.Api.Contracts.Requests;

/// <summary>
/// Request model for paginated queries.
/// </summary>
public sealed class PaginationRequest
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public string? Search { get; init; }
}
