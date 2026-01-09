using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadAiScoring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AiConfidence",
                schema: "crm",
                table: "Leads",
                type: "decimal(5,4)",
                precision: 5,
                scale: 4,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AiRationale",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AiScore",
                schema: "crm",
                table: "Leads",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AiScoredAtUtc",
                schema: "crm",
                table: "Leads",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AiConfidence",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "AiRationale",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "AiScore",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "AiScoredAtUtc",
                schema: "crm",
                table: "Leads");
        }
    }
}
