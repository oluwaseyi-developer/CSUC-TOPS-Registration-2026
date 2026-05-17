using CSUC.Registration.Domain.Common;

namespace CSUC.Registration.Infrastructure.Persistence;

/// <summary>
/// Unit of Work implementation using Entity Framework Core.
/// </summary>
public sealed class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }
}
