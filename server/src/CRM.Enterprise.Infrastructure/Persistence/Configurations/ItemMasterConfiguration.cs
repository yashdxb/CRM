using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class ItemMasterConfiguration : IEntityTypeConfiguration<ItemMaster>
{
    public void Configure(EntityTypeBuilder<ItemMaster> builder)
    {
        builder.Property(i => i.Sku)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(i => i.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(i => i.Description)
            .HasMaxLength(800);

        builder.Property(i => i.CategoryName)
            .HasMaxLength(160);

        builder.Property(i => i.DefaultUom)
            .HasMaxLength(40);
    }
}
