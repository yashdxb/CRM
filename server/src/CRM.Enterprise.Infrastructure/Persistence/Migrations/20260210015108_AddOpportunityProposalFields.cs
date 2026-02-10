using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityProposalFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ProposalGeneratedAtUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProposalLink",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(1024)",
                maxLength: 1024,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProposalNotes",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ProposalSentAtUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProposalStatus",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProposalGeneratedAtUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "ProposalLink",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "ProposalNotes",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "ProposalSentAtUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "ProposalStatus",
                schema: "crm",
                table: "Opportunities");
        }
    }
}
