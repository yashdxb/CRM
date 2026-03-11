using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public class LeadStatusHistoryConfiguration : IEntityTypeConfiguration<LeadStatusHistory>
{
    public void Configure(EntityTypeBuilder<LeadStatusHistory> builder)
    {
        builder.Property(h => h.Reason).HasMaxLength(500);

        builder.HasOne(h => h.LeadStatus)
            .WithMany()
            .HasForeignKey(h => h.LeadStatusId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
