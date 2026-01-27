using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityRenewals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ContractEndDateUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ContractStartDateUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OpportunityType",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Renewal30TaskCreatedAtUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Renewal60TaskCreatedAtUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Renewal90TaskCreatedAtUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RenewalOfOpportunityId",
                schema: "crm",
                table: "Opportunities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RenewalOpportunityId",
                schema: "crm",
                table: "Opportunities",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContractEndDateUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "ContractStartDateUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "OpportunityType",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "Renewal30TaskCreatedAtUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "Renewal60TaskCreatedAtUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "Renewal90TaskCreatedAtUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "RenewalOfOpportunityId",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "RenewalOpportunityId",
                schema: "crm",
                table: "Opportunities");
        }
    }
}
