using CSUC.Registration.Application.Common;
using CSUC.Registration.Domain.Common;
using CSUC.Registration.Domain.Entities;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Commands.CreateRegistration;

/// <summary>
/// Handler for CreateRegistrationCommand.
/// </summary>
public sealed class CreateRegistrationCommandHandler
    : IRequestHandler<CreateRegistrationCommand, Result<Guid>>
{
    private readonly IRegistrantRepository _registrantRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateRegistrationCommandHandler(
        IRegistrantRepository registrantRepository,
        IUnitOfWork unitOfWork)
    {
        _registrantRepository = registrantRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(
        CreateRegistrationCommand request,
        CancellationToken cancellationToken)
    {
        var emailExists = await _registrantRepository.ExistsAsync(
            request.Email.Trim().ToLowerInvariant(), 
            cancellationToken);

        if (emailExists)
        {
            return Result<Guid>.Failure("A registration with this email address already exists");
        }

        var registrant = Registrant.Create(
            request.FullName,
            request.Sex,
            request.Email,
            request.PhoneNumber,
            request.LocationState,
            request.Expectations,
            request.NeedsAccommodation,
            request.MeansOfTransportation,
            request.ComingWith,
            request.NumberOfPersons);

        await _registrantRepository.AddAsync(registrant, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<Guid>.Success(registrant.Id);
    }
}
