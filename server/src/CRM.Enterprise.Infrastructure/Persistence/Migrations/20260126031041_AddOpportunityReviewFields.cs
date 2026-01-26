using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityReviewFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DiscountAmount",
                schema: "crm",
                table: "Opportunities",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountPercent",
                schema: "crm",
                table: "Opportunities",
                type: "decimal(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LegalNotes",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LegalReviewStatus",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PricingNotes",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecurityNotes",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecurityReviewStatus",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountAmount",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "DiscountPercent",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "LegalNotes",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "LegalReviewStatus",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "PricingNotes",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "SecurityNotes",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "SecurityReviewStatus",
                schema: "crm",
                table: "Opportunities");
        }
    }
}
