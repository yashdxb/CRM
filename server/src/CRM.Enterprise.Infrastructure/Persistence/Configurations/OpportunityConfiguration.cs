using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public class OpportunityConfiguration : IEntityTypeConfiguration<Opportunity>
{
    public void Configure(EntityTypeBuilder<Opportunity> builder)
    {
        builder.Property(o => o.Amount).HasPrecision(18, 2);
        builder.Property(o => o.Probability).HasPrecision(18, 2);

        builder.HasMany(o => o.StageHistory)
            .WithOne(h => h.Opportunity)
            .HasForeignKey(h => h.OpportunityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
