using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LeadOutcomeReasonGuidFkMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisqualifiedReason",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "LossReason",
                schema: "crm",
                table: "Leads");

            migrationBuilder.AddColumn<Guid>(
                name: "DisqualificationReasonId",
                schema: "crm",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LossReasonId",
                schema: "crm",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Leads_DisqualificationReasonId",
                schema: "crm",
                table: "Leads",
                column: "DisqualificationReasonId");

            migrationBuilder.CreateIndex(
                name: "IX_Leads_LossReasonId",
                schema: "crm",
                table: "Leads",
                column: "LossReasonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_LeadDisqualificationReasons_DisqualificationReasonId",
                schema: "crm",
                table: "Leads",
                column: "DisqualificationReasonId",
                principalTable: "LeadDisqualificationReasons",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_LeadLossReasons_LossReasonId",
                schema: "crm",
                table: "Leads",
                column: "LossReasonId",
                principalTable: "LeadLossReasons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_LeadDisqualificationReasons_DisqualificationReasonId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropForeignKey(
                name: "FK_Leads_LeadLossReasons_LossReasonId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropIndex(
                name: "IX_Leads_DisqualificationReasonId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropIndex(
                name: "IX_Leads_LossReasonId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "DisqualificationReasonId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "LossReasonId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.AddColumn<string>(
                name: "DisqualifiedReason",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LossReason",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
