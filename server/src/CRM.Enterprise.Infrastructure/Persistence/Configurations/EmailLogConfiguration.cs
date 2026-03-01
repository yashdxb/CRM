using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class EmailLogConfiguration : IEntityTypeConfiguration<EmailLog>
{
    public void Configure(EntityTypeBuilder<EmailLog> builder)
    {
        builder.Property(e => e.ToEmail)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(e => e.ToName)
            .HasMaxLength(256);

        builder.Property(e => e.CcEmails)
            .HasMaxLength(1000);

        builder.Property(e => e.BccEmails)
            .HasMaxLength(1000);

        builder.Property(e => e.Subject)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.HtmlBody)
            .IsRequired();

        builder.Property(e => e.TextBody);

        builder.Property(e => e.Status)
            .IsRequired();

        builder.Property(e => e.MessageId)
            .HasMaxLength(256);

        builder.Property(e => e.ExternalId)
            .HasMaxLength(256);

        builder.Property(e => e.ErrorMessage)
            .HasMaxLength(2000);

        builder.Property(e => e.BounceReason)
            .HasMaxLength(1000);

        builder.HasIndex(e => new { e.TenantId, e.ToEmail })
            .HasFilter("[IsDeleted] = 0");

        builder.HasIndex(e => new { e.TenantId, e.Status })
            .HasFilter("[IsDeleted] = 0");

        builder.HasIndex(e => e.MessageId)
            .HasFilter("[MessageId] IS NOT NULL");

        builder.HasIndex(e => new { e.TenantId, e.RelatedEntityType, e.RelatedEntityId })
            .HasFilter("[RelatedEntityId] IS NOT NULL");

        builder.HasOne(e => e.Template)
            .WithMany(t => t.EmailLogs)
            .HasForeignKey(e => e.TemplateId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(e => e.Sender)
            .WithMany()
            .HasForeignKey(e => e.SenderId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
