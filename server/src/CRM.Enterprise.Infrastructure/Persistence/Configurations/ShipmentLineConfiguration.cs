using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class ShipmentLineConfiguration : IEntityTypeConfiguration<ShipmentLine>
{
    public void Configure(EntityTypeBuilder<ShipmentLine> builder)
    {
        builder.Property(l => l.LineNumber)
            .IsRequired();

        builder.Property(l => l.Description)
            .HasMaxLength(300);

        builder.Property(l => l.Uom)
            .HasMaxLength(40);

        builder.Property(l => l.Quantity)
            .HasPrecision(18, 2);

        builder.HasOne(l => l.ItemMaster)
            .WithMany()
            .HasForeignKey(l => l.ItemMasterId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
