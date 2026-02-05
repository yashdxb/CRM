using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadQualificationValidationDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BudgetValidatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BuyingTimelineValidatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EconomicBuyerValidatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "IcpFitValidatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ProblemSeverityValidatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReadinessValidatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetValidatedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "BuyingTimelineValidatedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "EconomicBuyerValidatedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "IcpFitValidatedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ProblemSeverityValidatedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ReadinessValidatedAtUtc",
                schema: "crm",
                table: "Leads");
        }
    }
}
