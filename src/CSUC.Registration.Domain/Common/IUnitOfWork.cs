namespace CSUC.Registration.Domain.Common;

/// <summary>
/// Unit of Work interface for managing database transactions.
/// </summary>
public interface IUnitOfWork
{
    /// <summary>
    /// Saves all changes made in this unit of work to the database.
    /// </summary>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
