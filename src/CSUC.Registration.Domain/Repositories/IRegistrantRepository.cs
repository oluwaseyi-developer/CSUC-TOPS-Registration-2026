using CSUC.Registration.Domain.Entities;

namespace CSUC.Registration.Domain.Repositories;

/// <summary>
/// Repository interface for Registrant entity operations.
/// </summary>
public interface IRegistrantRepository
{
    /// <summary>
    /// Gets a registrant by their unique identifier.
    /// </summary>
    Task<Registrant?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets a registrant by their email address.
    /// </summary>
    Task<Registrant?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all registrants.
    /// </summary>
    Task<IReadOnlyList<Registrant>> GetAllAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets a paged list of registrants with optional search.
    /// </summary>
    Task<IReadOnlyList<Registrant>> GetPagedAsync(
        int page, 
        int pageSize, 
        string? searchTerm = null, 
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the total count of registrants with optional search.
    /// </summary>
    Task<int> GetTotalCountAsync(string? searchTerm = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Adds a new registrant.
    /// </summary>
    Task AddAsync(Registrant registrant, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing registrant.
    /// </summary>
    void Update(Registrant registrant);

    /// <summary>
    /// Deletes a registrant.
    /// </summary>
    void Delete(Registrant registrant);

    /// <summary>
    /// Checks if a registrant with the given email exists.
    /// </summary>
    Task<bool> ExistsAsync(string email, CancellationToken cancellationToken = default);
}
