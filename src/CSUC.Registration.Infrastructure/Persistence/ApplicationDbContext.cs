using CSUC.Registration.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CSUC.Registration.Infrastructure.Persistence;

/// <summary>
/// Application database context for PostgreSQL.
/// </summary>
public sealed class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Registrant> Registrants => Set<Registrant>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
