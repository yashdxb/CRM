using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadConversationAiSummary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConversationAiNextAction",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationAiSentiment",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationAiSummary",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ConversationAiSummaryAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConversationAiNextAction",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiSentiment",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiSummary",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiSummaryAtUtc",
                schema: "crm",
                table: "Leads");
        }
    }
}
