using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class WarehouseConfiguration : IEntityTypeConfiguration<Warehouse>
{
    public void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        builder.Property(w => w.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(w => w.Code)
            .HasMaxLength(60);

        builder.Property(w => w.Status)
            .HasMaxLength(40);

        builder.Property(w => w.AddressLine1)
            .HasMaxLength(200);

        builder.Property(w => w.AddressLine2)
            .HasMaxLength(200);

        builder.Property(w => w.City)
            .HasMaxLength(120);

        builder.Property(w => w.State)
            .HasMaxLength(120);

        builder.Property(w => w.PostalCode)
            .HasMaxLength(40);

        builder.Property(w => w.Country)
            .HasMaxLength(120);

        builder.Property(w => w.ContactName)
            .HasMaxLength(200);

        builder.Property(w => w.ContactEmail)
            .HasMaxLength(320);

        builder.Property(w => w.ContactPhone)
            .HasMaxLength(60);

        builder.Property(w => w.Notes)
            .HasMaxLength(2000);
    }
}
