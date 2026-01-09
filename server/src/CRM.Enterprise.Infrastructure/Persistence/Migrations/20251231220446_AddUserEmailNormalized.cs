using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserEmailNormalized : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailNormalized",
                schema: "identity",
                table: "Users",
                type: "nvarchar(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.Sql("""
                UPDATE [identity].[Users]
                SET [EmailNormalized] = LOWER(LTRIM(RTRIM([Email])))
                WHERE [Email] IS NOT NULL AND [EmailNormalized] IS NULL;
                """);

            migrationBuilder.Sql("""
                WITH ranked AS (
                    SELECT
                        [Id],
                        [TenantId],
                        [EmailNormalized],
                        ROW_NUMBER() OVER (
                            PARTITION BY [TenantId], [EmailNormalized]
                            ORDER BY [IsDeleted] ASC, [LastLoginAtUtc] DESC, [CreatedAtUtc] DESC, [Id] ASC
                        ) AS rn
                    FROM [identity].[Users]
                    WHERE [EmailNormalized] IS NOT NULL
                )
                UPDATE u
                SET [IsDeleted] = 1,
                    [IsActive] = 0,
                    [DeletedAtUtc] = SYSUTCDATETIME(),
                    [DeletedBy] = 'dedupe'
                FROM [identity].[Users] u
                INNER JOIN ranked r ON u.[Id] = r.[Id]
                WHERE r.rn > 1 AND u.[IsDeleted] = 0;
                """);

            migrationBuilder.CreateIndex(
                name: "IX_Users_TenantId_EmailNormalized",
                schema: "identity",
                table: "Users",
                columns: new[] { "TenantId", "EmailNormalized" },
                unique: true,
                filter: "[EmailNormalized] IS NOT NULL AND [IsDeleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_TenantId_EmailNormalized",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailNormalized",
                schema: "identity",
                table: "Users");
        }
    }
}
