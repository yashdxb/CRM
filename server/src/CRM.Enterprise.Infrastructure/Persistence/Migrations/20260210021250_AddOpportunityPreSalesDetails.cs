using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityPreSalesDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PreSalesApproach",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreSalesScope",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreSalesApproach",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "PreSalesScope",
                schema: "crm",
                table: "Opportunities");
        }
    }
}
