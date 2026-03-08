using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkflowLifecycleAndDecisionLinks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApprovalWorkflowDraftJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovalWorkflowPublishedAtUtc",
                schema: "identity",
                table: "Tenants",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovalWorkflowPublishedBy",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovalWorkflowPublishedJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ApproverRole",
                schema: "crm",
                table: "OpportunityApprovals",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "ApproverRoleId",
                schema: "crm",
                table: "OpportunityApprovals",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ApproverRoleId",
                schema: "crm",
                table: "DecisionSteps",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkflowDealId",
                schema: "crm",
                table: "DecisionRequests",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkflowDealName",
                schema: "crm",
                table: "DecisionRequests",
                type: "nvarchar(240)",
                maxLength: 240,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkflowExecutionId",
                schema: "crm",
                table: "DecisionRequests",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkflowName",
                schema: "crm",
                table: "DecisionRequests",
                type: "nvarchar(160)",
                maxLength: 160,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkflowStepNodeId",
                schema: "crm",
                table: "DecisionRequests",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkflowStepOrder",
                schema: "crm",
                table: "DecisionRequests",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkflowVersion",
                schema: "crm",
                table: "DecisionRequests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DecisionRequests_TenantId_WorkflowExecutionId",
                schema: "crm",
                table: "DecisionRequests",
                columns: new[] { "TenantId", "WorkflowExecutionId" },
                filter: "[WorkflowExecutionId] IS NOT NULL AND [IsDeleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DecisionRequests_TenantId_WorkflowExecutionId",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "ApprovalWorkflowDraftJson",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "ApprovalWorkflowPublishedAtUtc",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "ApprovalWorkflowPublishedBy",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "ApprovalWorkflowPublishedJson",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "ApproverRoleId",
                schema: "crm",
                table: "OpportunityApprovals");

            migrationBuilder.DropColumn(
                name: "ApproverRoleId",
                schema: "crm",
                table: "DecisionSteps");

            migrationBuilder.DropColumn(
                name: "WorkflowDealId",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowDealName",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowExecutionId",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowName",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowStepNodeId",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowStepOrder",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.DropColumn(
                name: "WorkflowVersion",
                schema: "crm",
                table: "DecisionRequests");

            migrationBuilder.AlterColumn<string>(
                name: "ApproverRole",
                schema: "crm",
                table: "OpportunityApprovals",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(120)",
                oldMaxLength: 120);
        }
    }
}
