using CSUC.Registration.Domain.Enums;
using FluentValidation;
using System.Text.RegularExpressions;

namespace CSUC.Registration.Application.Features.Registrations.Commands.CreateRegistration;

/// <summary>
/// Validator for CreateRegistrationCommand.
/// </summary>
public sealed class CreateRegistrationCommandValidator : AbstractValidator<CreateRegistrationCommand>
{
    // Nigerian phone number pattern: +234, 234, or 0 prefix followed by 7, 8, or 9, then 0 or 1, then 8 more digits
    private static readonly Regex NigerianPhoneRegex = new(
        @"^(\+234|234|0)?[789][01]\d{8}$",
        RegexOptions.Compiled);

    // Name pattern: letters, spaces, hyphens, apostrophes only
    private static readonly Regex NameRegex = new(
        @"^[a-zA-Z\s\-'.]+$",
        RegexOptions.Compiled);

    public CreateRegistrationCommandValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty().WithMessage("Full name is required")
            .MinimumLength(2).WithMessage("Full name must be at least 2 characters")
            .MaximumLength(200).WithMessage("Full name must not exceed 200 characters")
            .Must(name => NameRegex.IsMatch(name ?? string.Empty))
            .WithMessage("Full name can only contain letters, spaces, hyphens, and apostrophes");

        RuleFor(x => x.Sex)
            .IsInEnum().WithMessage("Please select a valid gender");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required")
            .EmailAddress().WithMessage("Please enter a valid email address")
            .MaximumLength(256).WithMessage("Email must not exceed 256 characters");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required")
            .MinimumLength(10).WithMessage("Phone number must be at least 10 digits")
            .MaximumLength(15).WithMessage("Phone number must not exceed 15 digits")
            .Must(phone => NigerianPhoneRegex.IsMatch(phone ?? string.Empty))
            .WithMessage("Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)");

        RuleFor(x => x.LocationState)
            .NotEmpty().WithMessage("Location/State is required")
            .MinimumLength(2).WithMessage("Location/State must be at least 2 characters")
            .MaximumLength(100).WithMessage("Location/State must not exceed 100 characters");

        RuleFor(x => x.Expectations)
            .MaximumLength(2000).WithMessage("Expectations must not exceed 2000 characters")
            .When(x => !string.IsNullOrEmpty(x.Expectations));

        RuleFor(x => x.MeansOfTransportation)
            .IsInEnum().WithMessage("Please select a valid means of transportation");

        RuleFor(x => x.ComingWith)
            .IsInEnum().WithMessage("Please select who you will be coming with");

        RuleFor(x => x.NumberOfPersons)
            .GreaterThan(0)
            .When(x => x.ComingWith != CompanionType.Alone)
            .WithMessage("Please specify the number of persons coming with you");

        RuleFor(x => x.NumberOfPersons)
            .LessThanOrEqualTo(50)
            .When(x => x.ComingWith != CompanionType.Alone)
            .WithMessage("Number of persons must not exceed 50");
    }
}
