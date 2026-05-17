namespace CSUC.Registration.Application.Features.Registrations.DTOs;

/// <summary>
/// Data transfer object for form dropdown options.
/// </summary>
public sealed record FormOptionsDto(
    IReadOnlyList<OptionItemDto> Gender,
    IReadOnlyList<OptionItemDto> Transportation,
    IReadOnlyList<OptionItemDto> ComingWith);

public sealed record OptionItemDto(int Value, string Label);
