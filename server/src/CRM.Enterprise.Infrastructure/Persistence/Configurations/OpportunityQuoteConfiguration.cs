using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class OpportunityQuoteConfiguration : IEntityTypeConfiguration<OpportunityQuote>
{
    public void Configure(EntityTypeBuilder<OpportunityQuote> builder)
    {
        builder.Property(q => q.QuoteNumber)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(q => q.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(q => q.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(q => q.Currency)
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(q => q.Subtotal).HasPrecision(18, 2);
        builder.Property(q => q.DiscountAmount).HasPrecision(18, 2);
        builder.Property(q => q.TaxAmount).HasPrecision(18, 2);
        builder.Property(q => q.TotalAmount).HasPrecision(18, 2);

        builder.Property(q => q.Notes)
            .HasMaxLength(2000);

        builder.HasIndex(q => new { q.TenantId, q.OpportunityId, q.QuoteNumber })
            .HasFilter("[IsDeleted] = 0")
            .IsUnique();

        builder.HasOne(q => q.Opportunity)
            .WithMany(o => o.Quotes)
            .HasForeignKey(q => q.OpportunityId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(q => q.PriceList)
            .WithMany()
            .HasForeignKey(q => q.PriceListId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(q => q.Lines)
            .WithOne(l => l.OpportunityQuote)
            .HasForeignKey(l => l.OpportunityQuoteId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
