using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class EmailTemplateConfiguration : IEntityTypeConfiguration<EmailTemplate>
{
    public void Configure(EntityTypeBuilder<EmailTemplate> builder)
    {
        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(t => t.Description)
            .HasMaxLength(1000);

        builder.Property(t => t.Subject)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(t => t.HtmlBody)
            .IsRequired();

        builder.Property(t => t.TextBody);

        builder.Property(t => t.Category)
            .HasMaxLength(100);

        builder.Property(t => t.Variables)
            .HasMaxLength(2000);

        builder.HasIndex(t => new { t.TenantId, t.Name })
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");

        builder.HasIndex(t => new { t.TenantId, t.Category })
            .HasFilter("[IsDeleted] = 0");

        builder.HasIndex(t => new { t.TenantId, t.IsActive })
            .HasFilter("[IsDeleted] = 0");
    }
}
