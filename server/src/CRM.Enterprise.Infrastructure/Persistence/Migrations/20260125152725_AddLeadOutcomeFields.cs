using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadOutcomeFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisqualifiedReason",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstTouchDueAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstTouchedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NurtureFollowUpAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QualifiedNotes",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisqualifiedReason",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "FirstTouchDueAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "FirstTouchedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "NurtureFollowUpAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "QualifiedNotes",
                schema: "crm",
                table: "Leads");
        }
    }
}
