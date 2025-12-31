using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class ImportJobConfiguration : IEntityTypeConfiguration<ImportJob>
{
    public void Configure(EntityTypeBuilder<ImportJob> builder)
    {
        builder.Property(job => job.EntityType)
            .HasMaxLength(60)
            .IsRequired();

        builder.Property(job => job.FileName)
            .HasMaxLength(260)
            .IsRequired();

        builder.Property(job => job.FilePath)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(job => job.Status)
            .HasMaxLength(40)
            .IsRequired();

        builder.HasIndex(job => job.Status);
    }
}
