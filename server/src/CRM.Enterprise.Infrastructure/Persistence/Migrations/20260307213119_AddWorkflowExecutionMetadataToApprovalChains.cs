using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkflowExecutionMetadataToApprovalChains : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Purpose",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "nvarchar(80)",
                maxLength: 80,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "DecisionRequestId",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkflowKey",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "nvarchar(80)",
                maxLength: 80,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WorkflowName",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "nvarchar(160)",
                maxLength: 160,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "WorkflowVersion",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityApprovalChains_TenantId_DecisionRequestId",
                schema: "crm",
                table: "OpportunityApprovalChains",
                columns: new[] { "TenantId", "DecisionRequestId" },
                filter: "[DecisionRequestId] IS NOT NULL AND [IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityApprovalChains_TenantId_OpportunityId_Status_RequestedOn",
                schema: "crm",
                table: "OpportunityApprovalChains",
                columns: new[] { "TenantId", "OpportunityId", "Status", "RequestedOn" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_OpportunityApprovalChains_TenantId_DecisionRequestId",
                schema: "crm",
                table: "OpportunityApprovalChains");

            migrationBuilder.DropIndex(
                name: "IX_OpportunityApprovalChains_TenantId_OpportunityId_Status_RequestedOn",
                schema: "crm",
                table: "OpportunityApprovalChains");

            migrationBuilder.DropColumn(
                name: "DecisionRequestId",
                schema: "crm",
                table: "OpportunityApprovalChains");

            migrationBuilder.DropColumn(
                name: "WorkflowKey",
                schema: "crm",
                table: "OpportunityApprovalChains");

            migrationBuilder.DropColumn(
                name: "WorkflowName",
                schema: "crm",
                table: "OpportunityApprovalChains");

            migrationBuilder.DropColumn(
                name: "WorkflowVersion",
                schema: "crm",
                table: "OpportunityApprovalChains");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)",
                oldMaxLength: 40);

            migrationBuilder.AlterColumn<string>(
                name: "Purpose",
                schema: "crm",
                table: "OpportunityApprovalChains",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(80)",
                oldMaxLength: 80);
        }
    }
}
