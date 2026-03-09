using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadConversationScoreSnapshot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConversationScore",
                schema: "crm",
                table: "Leads",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationScoreLabel",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(32)",
                maxLength: 32,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationScoreReasonsJson",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ConversationScoreUpdatedAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ConversationSignalAvailable",
                schema: "crm",
                table: "Leads",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConversationScore",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationScoreLabel",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationScoreReasonsJson",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationScoreUpdatedAtUtc",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationSignalAvailable",
                schema: "crm",
                table: "Leads");
        }
    }
}
