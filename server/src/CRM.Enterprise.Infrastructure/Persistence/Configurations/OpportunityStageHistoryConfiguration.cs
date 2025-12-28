using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public class OpportunityStageHistoryConfiguration : IEntityTypeConfiguration<OpportunityStageHistory>
{
    public void Configure(EntityTypeBuilder<OpportunityStageHistory> builder)
    {
        builder.HasOne(h => h.OpportunityStage)
            .WithMany()
            .HasForeignKey(h => h.OpportunityStageId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
