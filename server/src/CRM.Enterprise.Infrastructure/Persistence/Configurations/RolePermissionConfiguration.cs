using CRM.Enterprise.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRM.Enterprise.Infrastructure.Persistence.Configurations;

public sealed class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission>
{
    public void Configure(EntityTypeBuilder<RolePermission> builder)
    {
        builder.Property(permission => permission.Permission)
            .IsRequired()
            .HasMaxLength(256);

        builder.HasIndex(permission => new { permission.RoleId, permission.Permission })
            .IsUnique();
    }
}
