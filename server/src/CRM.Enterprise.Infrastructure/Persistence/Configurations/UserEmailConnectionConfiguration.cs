using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class UserEmailConnectionConfiguration : IEntityTypeConfiguration<UserEmailConnection>
{
    public void Configure(EntityTypeBuilder<UserEmailConnection> builder)
    {
        builder.ToTable("UserEmailConnections");

        builder.Property(e => e.EmailAddress)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(e => e.DisplayName)
            .HasMaxLength(256);

        builder.Property(e => e.Provider)
            .IsRequired();

        builder.Property(e => e.AccessTokenEncrypted)
            .IsRequired()
            .HasMaxLength(4000);

        builder.Property(e => e.RefreshTokenEncrypted)
            .IsRequired()
            .HasMaxLength(4000);

        builder.Property(e => e.Scopes)
            .HasMaxLength(2000);

        builder.Property(e => e.LastError)
            .HasMaxLength(2000);

        builder.HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(e => new { e.TenantId, e.UserId })
            .HasFilter("[IsDeleted] = 0");

        builder.HasIndex(e => new { e.TenantId, e.UserId, e.Provider })
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");
    }
}
