using CSUC.Registration.Application.Features.Registrations.DTOs;
using CSUC.Registration.Domain.Common;
using CSUC.Registration.Domain.Entities;
using CSUC.Registration.Domain.Enums;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Commands.ImportRegistrations;

/// <summary>
/// Handler for ImportRegistrationsCommand.
/// </summary>
public sealed class ImportRegistrationsCommandHandler : IRequestHandler<ImportRegistrationsCommand, int>
{
    private readonly IRegistrantRepository _registrantRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ImportRegistrationsCommandHandler(
        IRegistrantRepository registrantRepository,
        IUnitOfWork unitOfWork)
    {
        _registrantRepository = registrantRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<int> Handle(ImportRegistrationsCommand request, CancellationToken cancellationToken)
    {
        var importedCount = 0;

        foreach (var dto in request.Registrations)
        {
            // Check if email already exists
            var exists = await _registrantRepository.ExistsAsync(dto.Email, cancellationToken);
            if (exists)
            {
                continue; // Skip duplicates
            }

            // Parse enums
            var gender = dto.Sex.Equals("Male", StringComparison.OrdinalIgnoreCase) ? Gender.Male : Gender.Female;
            var transportation = ParseTransportation(dto.MeansOfTransportation);
            var comingWith = ParseCompanionType(dto.ComingWith);

            var registrant = Registrant.Create(
                dto.FullName,
                gender,
                dto.Email,
                dto.PhoneNumber,
                dto.LocationState,
                dto.Expectations ?? string.Empty,
                dto.NeedsAccommodation,
                transportation,
                comingWith,
                dto.NumberOfPersons);

            await _registrantRepository.AddAsync(registrant, cancellationToken);
            importedCount++;
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return importedCount;
    }

    private static TransportationType ParseTransportation(string value)
    {
        return value.ToLowerInvariant() switch
        {
            "public transport" or "publictransport" => TransportationType.PublicTransport,
            "private vehicle" or "privatevehicle" => TransportationType.PrivateVehicle,
            "join the brethren" or "jointhebrethren" => TransportationType.JoinTheBrethren,
            _ => TransportationType.PublicTransport
        };
    }

    private static CompanionType ParseCompanionType(string value)
    {
        return value.ToLowerInvariant() switch
        {
            "alone" => CompanionType.Alone,
            "with brethren" or "withbrethren" => CompanionType.WithBrethren,
            "with family" or "withfamily" => CompanionType.WithFamily,
            _ => CompanionType.Alone
        };
    }
}
