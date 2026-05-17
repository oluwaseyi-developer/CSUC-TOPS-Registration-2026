using System.ComponentModel.DataAnnotations;

namespace CSUC.Registration.Api.Contracts.Requests;

/// <summary>
/// Request model for creating a new registration.
/// </summary>
public sealed class CreateRegistrationRequest
{
    [Required(ErrorMessage = "Full name is required")]
    [StringLength(200, ErrorMessage = "Full name must not exceed 200 characters")]
    public string FullName { get; init; } = string.Empty;

    [Required(ErrorMessage = "Please select your gender")]
    [Range(1, 2, ErrorMessage = "Please select a valid gender")]
    public int Sex { get; init; }

    [Required(ErrorMessage = "Email address is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [StringLength(256, ErrorMessage = "Email must not exceed 256 characters")]
    public string Email { get; init; } = string.Empty;

    [Required(ErrorMessage = "Phone number is required")]
    [StringLength(20, ErrorMessage = "Phone number must not exceed 20 characters")]
    public string PhoneNumber { get; init; } = string.Empty;

    [Required(ErrorMessage = "Location/State is required")]
    [StringLength(100, ErrorMessage = "Location/State must not exceed 100 characters")]
    public string LocationState { get; init; } = string.Empty;

    [Required(ErrorMessage = "Please share your expectations")]
    [StringLength(2000, ErrorMessage = "Expectations must not exceed 2000 characters")]
    public string Expectations { get; init; } = string.Empty;

    public bool NeedsAccommodation { get; init; }

    [Required(ErrorMessage = "Please select means of transportation")]
    [Range(1, 3, ErrorMessage = "Please select a valid means of transportation")]
    public int MeansOfTransportation { get; init; }

    [Required(ErrorMessage = "Please select who you will be coming with")]
    [Range(1, 3, ErrorMessage = "Please select a valid option")]
    public int ComingWith { get; init; }

    [Range(0, 50, ErrorMessage = "Number of persons must be between 0 and 50")]
    public int NumberOfPersons { get; init; }
}
