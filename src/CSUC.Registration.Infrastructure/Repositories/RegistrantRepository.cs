using CSUC.Registration.Domain.Entities;
using CSUC.Registration.Domain.Repositories;
using CSUC.Registration.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CSUC.Registration.Infrastructure.Repositories;

/// <summary>
/// Repository implementation for Registrant entity.
/// </summary>
public sealed class RegistrantRepository : IRegistrantRepository
{
    private readonly ApplicationDbContext _context;

    public RegistrantRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Registrant?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Registrants
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);
    }

    public async Task<Registrant?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();

        return await _context.Registrants
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Email == normalizedEmail, cancellationToken);
    }

    public async Task<IReadOnlyList<Registrant>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Registrants
            .AsNoTracking()
            .OrderByDescending(r => r.RegisteredAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Registrant>> GetPagedAsync(
        int page,
        int pageSize,
        string? searchTerm = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.Registrants.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var search = searchTerm.Trim().ToLowerInvariant();
            query = query.Where(r =>
                r.FullName.ToLower().Contains(search) ||
                r.Email.ToLower().Contains(search) ||
                r.PhoneNumber.Contains(search) ||
                r.LocationState.ToLower().Contains(search));
        }

        return await query
            .OrderByDescending(r => r.RegisteredAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> GetTotalCountAsync(string? searchTerm = null, CancellationToken cancellationToken = default)
    {
        var query = _context.Registrants.AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            var search = searchTerm.Trim().ToLowerInvariant();
            query = query.Where(r =>
                r.FullName.ToLower().Contains(search) ||
                r.Email.ToLower().Contains(search) ||
                r.PhoneNumber.Contains(search) ||
                r.LocationState.ToLower().Contains(search));
        }

        return await query.CountAsync(cancellationToken);
    }

    public async Task AddAsync(Registrant registrant, CancellationToken cancellationToken = default)
    {
        await _context.Registrants.AddAsync(registrant, cancellationToken);
    }

    public void Update(Registrant registrant)
    {
        _context.Registrants.Update(registrant);
    }

    public void Delete(Registrant registrant)
    {
        _context.Registrants.Remove(registrant);
    }

    public async Task<bool> ExistsAsync(string email, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();

        return await _context.Registrants
            .AnyAsync(r => r.Email == normalizedEmail, cancellationToken);
    }
}
