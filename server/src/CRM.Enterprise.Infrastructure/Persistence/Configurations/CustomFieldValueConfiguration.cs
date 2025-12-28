using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public class CustomFieldValueConfiguration : IEntityTypeConfiguration<CustomFieldValue>
{
    public void Configure(EntityTypeBuilder<CustomFieldValue> builder)
    {
        builder.Property(v => v.NumberValue).HasPrecision(18, 2);
        builder.Property(v => v.CurrencyValue).HasPrecision(18, 2);
    }
}
