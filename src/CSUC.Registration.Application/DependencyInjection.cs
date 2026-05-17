using System.Reflection;
using CSUC.Registration.Application.Common.Behaviors;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace CSUC.Registration.Application;

/// <summary>
/// Extension methods for configuring Application layer services.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssembly(assembly);
        });

        services.AddValidatorsFromAssembly(assembly);

        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        return services;
    }
}
