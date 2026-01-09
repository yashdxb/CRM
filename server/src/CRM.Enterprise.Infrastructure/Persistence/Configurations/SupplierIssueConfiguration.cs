using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class SupplierIssueConfiguration : IEntityTypeConfiguration<SupplierIssue>
{
    public void Configure(EntityTypeBuilder<SupplierIssue> builder)
    {
        builder.Property(i => i.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(i => i.Description)
            .HasMaxLength(2000);

        builder.Property(i => i.Severity)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(i => i.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(i => i.Owner)
            .HasMaxLength(200);

        builder.HasOne(i => i.Supplier)
            .WithMany()
            .HasForeignKey(i => i.SupplierId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
