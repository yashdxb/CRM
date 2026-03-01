using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTenantFeatureFlagsJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FeatureFlagsJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FeatureFlagsJson",
                schema: "identity",
                table: "Tenants");
        }
    }
}
