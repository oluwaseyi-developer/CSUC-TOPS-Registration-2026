using CSUC.Registration.Application.Common;
using CSUC.Registration.Domain.Common;
using CSUC.Registration.Domain.Repositories;
using MediatR;

namespace CSUC.Registration.Application.Features.Registrations.Commands.DeleteRegistration;

/// <summary>
/// Handler for DeleteRegistrationCommand.
/// </summary>
public sealed class DeleteRegistrationCommandHandler
    : IRequestHandler<DeleteRegistrationCommand, Result<bool>>
{
    private readonly IRegistrantRepository _registrantRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteRegistrationCommandHandler(
        IRegistrantRepository registrantRepository,
        IUnitOfWork unitOfWork)
    {
        _registrantRepository = registrantRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<bool>> Handle(
        DeleteRegistrationCommand request,
        CancellationToken cancellationToken)
    {
        var registrant = await _registrantRepository.GetByIdAsync(request.Id, cancellationToken);

        if (registrant is null)
        {
            return Result<bool>.Failure("Registration not found");
        }

        _registrantRepository.Delete(registrant);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}
