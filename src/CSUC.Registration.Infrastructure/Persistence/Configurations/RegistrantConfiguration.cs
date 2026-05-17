using CSUC.Registration.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CSUC.Registration.Infrastructure.Persistence.Configurations;

/// <summary>
/// Entity Framework configuration for Registrant entity.
/// </summary>
public sealed class RegistrantConfiguration : IEntityTypeConfiguration<Registrant>
{
    public void Configure(EntityTypeBuilder<Registrant> builder)
    {
        builder.ToTable("registrants");

        builder.HasKey(r => r.Id);

        builder.Property(r => r.Id)
            .HasColumnName("id")
            .ValueGeneratedNever();

        builder.Property(r => r.FullName)
            .HasColumnName("full_name")
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(r => r.Sex)
            .HasColumnName("sex")
            .IsRequired();

        builder.Property(r => r.Email)
            .HasColumnName("email")
            .HasMaxLength(256)
            .IsRequired();

        builder.HasIndex(r => r.Email)
            .IsUnique()
            .HasDatabaseName("ix_registrants_email");

        builder.Property(r => r.PhoneNumber)
            .HasColumnName("phone_number")
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(r => r.LocationState)
            .HasColumnName("location_state")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(r => r.Expectations)
            .HasColumnName("expectations")
            .HasMaxLength(2000)
            .IsRequired();

        builder.Property(r => r.NeedsAccommodation)
            .HasColumnName("needs_accommodation")
            .IsRequired();

        builder.Property(r => r.MeansOfTransportation)
            .HasColumnName("means_of_transportation")
            .IsRequired();

        builder.Property(r => r.ComingWith)
            .HasColumnName("coming_with")
            .IsRequired();

        builder.Property(r => r.NumberOfPersons)
            .HasColumnName("number_of_persons")
            .IsRequired();

        builder.Property(r => r.RegisteredAt)
            .HasColumnName("registered_at")
            .IsRequired();

        builder.Property(r => r.UpdatedAt)
            .HasColumnName("updated_at");

        // Index for search and sorting
        builder.HasIndex(r => r.FullName)
            .HasDatabaseName("ix_registrants_full_name");

        builder.HasIndex(r => r.RegisteredAt)
            .HasDatabaseName("ix_registrants_registered_at");
    }
}
