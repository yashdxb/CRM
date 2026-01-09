using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class RfqConfiguration : IEntityTypeConfiguration<Rfq>
{
    public void Configure(EntityTypeBuilder<Rfq> builder)
    {
        builder.Property(r => r.RfqNumber)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(r => r.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(r => r.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.Property(r => r.Type)
            .HasMaxLength(80);

        builder.Property(r => r.Currency)
            .HasMaxLength(10);

        builder.Property(r => r.Description)
            .HasMaxLength(2000);

        builder.HasMany(r => r.Lines)
            .WithOne(l => l.Rfq)
            .HasForeignKey(l => l.RfqId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
