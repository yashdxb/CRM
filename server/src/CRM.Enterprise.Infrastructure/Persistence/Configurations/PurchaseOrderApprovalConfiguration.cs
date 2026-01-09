using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class PurchaseOrderApprovalConfiguration : IEntityTypeConfiguration<PurchaseOrderApproval>
{
    public void Configure(EntityTypeBuilder<PurchaseOrderApproval> builder)
    {
        builder.Property(a => a.ApproverRole)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(a => a.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(a => a.Notes)
            .HasMaxLength(1000);

        builder.HasOne(a => a.PurchaseOrder)
            .WithMany()
            .HasForeignKey(a => a.PurchaseOrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
