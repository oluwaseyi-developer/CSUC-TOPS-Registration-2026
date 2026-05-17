using CSUC.Registration.Application.Features.Registrations.DTOs;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Queries.GetFormOptions;

/// <summary>
/// Handler for GetFormOptionsQuery.
/// </summary>
public sealed class GetFormOptionsQueryHandler
    : IRequestHandler<GetFormOptionsQuery, FormOptionsDto>
{
    private static readonly FormOptionsDto CachedOptions = new(
        Gender:
        [
            new(1, "Male"),
            new(2, "Female")
        ],
        Transportation:
        [
            new(1, "Public Transport"),
            new(2, "Private Vehicle"),
            new(3, "Join the Brethren")
        ],
        ComingWith:
        [
            new(1, "Alone"),
            new(2, "With Brethren"),
            new(3, "With Family")
        ]);

    public Task<FormOptionsDto> Handle(
        GetFormOptionsQuery request,
        CancellationToken cancellationToken)
    {
        return Task.FromResult(CachedOptions);
    }
}
