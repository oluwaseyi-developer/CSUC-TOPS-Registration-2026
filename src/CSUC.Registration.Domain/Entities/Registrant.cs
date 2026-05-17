using CSUC.Registration.Domain.Enums;

namespace CSUC.Registration.Domain.Entities;

/// <summary>
/// Represents a registrant for the CSUC TOPS Covenant Service 2026.
/// </summary>
public sealed class Registrant
{
    public Guid Id { get; private set; }
    public string FullName { get; private set; } = string.Empty;
    public Gender Sex { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string PhoneNumber { get; private set; } = string.Empty;
    public string LocationState { get; private set; } = string.Empty;
    public string Expectations { get; private set; } = string.Empty;
    public bool NeedsAccommodation { get; private set; }
    public TransportationType MeansOfTransportation { get; private set; }
    public CompanionType ComingWith { get; private set; }
    public int NumberOfPersons { get; private set; }
    public DateTime RegisteredAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    /// <summary>
    /// Private constructor for EF Core.
    /// </summary>
    private Registrant() { }

    /// <summary>
    /// Factory method to create a new Registrant.
    /// </summary>
    public static Registrant Create(
        string fullName,
        Gender sex,
        string email,
        string phoneNumber,
        string locationState,
        string expectations,
        bool needsAccommodation,
        TransportationType meansOfTransportation,
        CompanionType comingWith,
        int numberOfPersons)
    {
        return new Registrant
        {
            Id = Guid.NewGuid(),
            FullName = fullName.Trim(),
            Sex = sex,
            Email = email.Trim().ToLowerInvariant(),
            PhoneNumber = phoneNumber.Trim(),
            LocationState = locationState.Trim(),
            Expectations = expectations.Trim(),
            NeedsAccommodation = needsAccommodation,
            MeansOfTransportation = meansOfTransportation,
            ComingWith = comingWith,
            NumberOfPersons = comingWith == CompanionType.Alone ? 0 : numberOfPersons,
            RegisteredAt = DateTime.UtcNow
        };
    }

    /// <summary>
    /// Updates the registrant information.
    /// </summary>
    public void Update(
        string fullName,
        Gender sex,
        string phoneNumber,
        string locationState,
        string expectations,
        bool needsAccommodation,
        TransportationType meansOfTransportation,
        CompanionType comingWith,
        int numberOfPersons)
    {
        FullName = fullName.Trim();
        Sex = sex;
        PhoneNumber = phoneNumber.Trim();
        LocationState = locationState.Trim();
        Expectations = expectations.Trim();
        NeedsAccommodation = needsAccommodation;
        MeansOfTransportation = meansOfTransportation;
        ComingWith = comingWith;
        NumberOfPersons = comingWith == CompanionType.Alone ? 0 : numberOfPersons;
        UpdatedAt = DateTime.UtcNow;
    }
}
