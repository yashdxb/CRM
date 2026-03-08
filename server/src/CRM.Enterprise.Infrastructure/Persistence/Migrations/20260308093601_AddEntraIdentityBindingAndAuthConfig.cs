using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEntraIdentityBindingAndAuthConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EntraObjectId",
                schema: "identity",
                table: "Users",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EntraTenantId",
                schema: "identity",
                table: "Users",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EntraUpn",
                schema: "identity",
                table: "Users",
                type: "nvarchar(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_TenantId_EntraTenantId_EntraObjectId",
                schema: "identity",
                table: "Users",
                columns: new[] { "TenantId", "EntraTenantId", "EntraObjectId" },
                unique: true,
                filter: "[EntraTenantId] IS NOT NULL AND [EntraObjectId] IS NOT NULL AND [IsDeleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_TenantId_EntraTenantId_EntraObjectId",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EntraObjectId",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EntraTenantId",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EntraUpn",
                schema: "identity",
                table: "Users");
        }
    }
}
