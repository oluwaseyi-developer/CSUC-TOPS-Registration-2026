using CSUC.Registration.Domain.Common;
using CSUC.Registration.Domain.Repositories;
using CSUC.Registration.Infrastructure.Persistence;
using CSUC.Registration.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CSUC.Registration.Infrastructure;

/// <summary>
/// Extension methods for configuring Infrastructure layer services.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 3,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null);
            });
        });

        services.AddScoped<IRegistrantRepository, RegistrantRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }

    /// <summary>
    /// Applies pending migrations to the database.
    /// </summary>
    public static async Task ApplyMigrationsAsync(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await context.Database.MigrateAsync();
    }
}
