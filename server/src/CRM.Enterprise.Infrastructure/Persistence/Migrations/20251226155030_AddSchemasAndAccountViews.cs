using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSchemasAndAccountViews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RolePermissions_RoleId",
                table: "RolePermissions");

            migrationBuilder.EnsureSchema(
                name: "crm");

            migrationBuilder.EnsureSchema(
                name: "identity");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Users",
                newSchema: "identity");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                newName: "UserRoles",
                newSchema: "identity");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "Roles",
                newSchema: "identity");

            migrationBuilder.RenameTable(
                name: "RolePermissions",
                newName: "RolePermissions",
                newSchema: "identity");

            migrationBuilder.RenameTable(
                name: "OpportunityStages",
                newName: "OpportunityStages",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "OpportunityStageHistories",
                newName: "OpportunityStageHistories",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "Opportunities",
                newName: "Opportunities",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "LeadStatusHistories",
                newName: "LeadStatusHistories",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "LeadStatuses",
                newName: "LeadStatuses",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "Leads",
                newName: "Leads",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "CustomFieldValues",
                newName: "CustomFieldValues",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "CustomFieldDefinitions",
                newName: "CustomFieldDefinitions",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "Contacts",
                newName: "Contacts",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "Activities",
                newName: "Activities",
                newSchema: "crm");

            migrationBuilder.RenameTable(
                name: "Accounts",
                newName: "Accounts",
                newSchema: "crm");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastViewedAtUtc",
                schema: "crm",
                table: "Accounts",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastViewedAtUtc",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.RenameTable(
                name: "Users",
                schema: "identity",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                schema: "identity",
                newName: "UserRoles");

            migrationBuilder.RenameTable(
                name: "Roles",
                schema: "identity",
                newName: "Roles");

            migrationBuilder.RenameTable(
                name: "RolePermissions",
                schema: "identity",
                newName: "RolePermissions");

            migrationBuilder.RenameTable(
                name: "OpportunityStages",
                schema: "crm",
                newName: "OpportunityStages");

            migrationBuilder.RenameTable(
                name: "OpportunityStageHistories",
                schema: "crm",
                newName: "OpportunityStageHistories");

            migrationBuilder.RenameTable(
                name: "Opportunities",
                schema: "crm",
                newName: "Opportunities");

            migrationBuilder.RenameTable(
                name: "LeadStatusHistories",
                schema: "crm",
                newName: "LeadStatusHistories");

            migrationBuilder.RenameTable(
                name: "LeadStatuses",
                schema: "crm",
                newName: "LeadStatuses");

            migrationBuilder.RenameTable(
                name: "Leads",
                schema: "crm",
                newName: "Leads");

            migrationBuilder.RenameTable(
                name: "CustomFieldValues",
                schema: "crm",
                newName: "CustomFieldValues");

            migrationBuilder.RenameTable(
                name: "CustomFieldDefinitions",
                schema: "crm",
                newName: "CustomFieldDefinitions");

            migrationBuilder.RenameTable(
                name: "Contacts",
                schema: "crm",
                newName: "Contacts");

            migrationBuilder.RenameTable(
                name: "Activities",
                schema: "crm",
                newName: "Activities");

            migrationBuilder.RenameTable(
                name: "Accounts",
                schema: "crm",
                newName: "Accounts");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_RoleId",
                table: "RolePermissions",
                column: "RoleId");
        }
    }
}
