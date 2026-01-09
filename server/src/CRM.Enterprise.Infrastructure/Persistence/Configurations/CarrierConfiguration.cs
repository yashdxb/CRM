using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class CarrierConfiguration : IEntityTypeConfiguration<Carrier>
{
    public void Configure(EntityTypeBuilder<Carrier> builder)
    {
        builder.Property(c => c.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(c => c.Code)
            .HasMaxLength(60);

        builder.Property(c => c.Status)
            .HasMaxLength(40);

        builder.Property(c => c.ContactName)
            .HasMaxLength(200);

        builder.Property(c => c.ContactEmail)
            .HasMaxLength(320);

        builder.Property(c => c.ContactPhone)
            .HasMaxLength(60);

        builder.Property(c => c.Website)
            .HasMaxLength(300);

        builder.Property(c => c.Notes)
            .HasMaxLength(2000);
    }
}
