using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddVerticalPresetRealEstateLeadProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VerticalPresetConfigJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BudgetBand",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuyerType",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FinancingReadiness",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MotivationUrgency",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreApprovalStatus",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreferredArea",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreferredPropertyType",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VerticalPresetConfigJson",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "BudgetBand",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "BuyerType",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "FinancingReadiness",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "MotivationUrgency",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "PreApprovalStatus",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "PreferredArea",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "PreferredPropertyType",
                schema: "crm",
                table: "Leads");
        }
    }
}
