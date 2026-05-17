using CSUC.Registration.Api.Contracts.Requests;
using CSUC.Registration.Application.Features.Registrations.Commands.CreateRegistration;
using CSUC.Registration.Application.Features.Registrations.Queries.GetRegistrantsPaged;
using CSUC.Registration.Domain.Enums;

namespace CSUC.Registration.Api.Contracts.Mappings;

/// <summary>
/// Extension methods for mapping API requests to Application commands/queries.
/// </summary>
public static class RequestMappings
{
    public static CreateRegistrationCommand ToCommand(this CreateRegistrationRequest request)
    {
        return new CreateRegistrationCommand(
            request.FullName,
            (Gender)request.Sex,
            request.Email,
            request.PhoneNumber,
            request.LocationState,
            request.Expectations,
            request.NeedsAccommodation,
            (TransportationType)request.MeansOfTransportation,
            (CompanionType)request.ComingWith,
            request.NumberOfPersons);
    }

    public static GetRegistrantsPagedQuery ToQuery(this PaginationRequest request)
    {
        return new GetRegistrantsPagedQuery(request.Page, request.PageSize, request.Search);
    }
}
