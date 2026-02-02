using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadQualificationFactors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BudgetAvailability",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BudgetEvidence",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuyingTimeline",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EconomicBuyer",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EconomicBuyerEvidence",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IcpFit",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IcpFitEvidence",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProblemEvidence",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProblemSeverity",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReadinessEvidence",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReadinessToSpend",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimelineEvidence",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetAvailability",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "BudgetEvidence",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "BuyingTimeline",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "EconomicBuyer",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "EconomicBuyerEvidence",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "IcpFit",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "IcpFitEvidence",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ProblemEvidence",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ProblemSeverity",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ReadinessEvidence",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ReadinessToSpend",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "TimelineEvidence",
                schema: "crm",
                table: "Leads");
        }
    }
}
