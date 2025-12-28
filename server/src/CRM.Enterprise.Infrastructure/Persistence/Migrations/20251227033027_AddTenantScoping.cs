using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTenantScoping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "identity",
                table: "Users",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "identity",
                table: "UserRoles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "identity",
                table: "Roles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "identity",
                table: "RolePermissions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "OpportunityStages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "OpportunityStageHistories",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "Opportunities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "LeadStatusHistories",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "LeadStatuses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "CustomFieldValues",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "CustomFieldDefinitions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "Contacts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                schema: "crm",
                table: "Accounts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Tenants",
                schema: "identity",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeZone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenants", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_TenantId",
                schema: "identity",
                table: "Users",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_TenantId",
                schema: "identity",
                table: "UserRoles",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_TenantId",
                schema: "identity",
                table: "Roles",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_TenantId",
                schema: "identity",
                table: "RolePermissions",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityStages_TenantId",
                schema: "crm",
                table: "OpportunityStages",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityStageHistories_TenantId",
                schema: "crm",
                table: "OpportunityStageHistories",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Opportunities_TenantId",
                schema: "crm",
                table: "Opportunities",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_LeadStatusHistories_TenantId",
                schema: "crm",
                table: "LeadStatusHistories",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_LeadStatuses_TenantId",
                schema: "crm",
                table: "LeadStatuses",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Leads_TenantId",
                schema: "crm",
                table: "Leads",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldValues_TenantId",
                schema: "crm",
                table: "CustomFieldValues",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomFieldDefinitions_TenantId",
                schema: "crm",
                table: "CustomFieldDefinitions",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_TenantId",
                schema: "crm",
                table: "Contacts",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TenantId",
                schema: "crm",
                table: "Activities",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_TenantId",
                schema: "crm",
                table: "Accounts",
                column: "TenantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tenants",
                schema: "identity");

            migrationBuilder.DropIndex(
                name: "IX_Users_TenantId",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_UserRoles_TenantId",
                schema: "identity",
                table: "UserRoles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_TenantId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_RolePermissions_TenantId",
                schema: "identity",
                table: "RolePermissions");

            migrationBuilder.DropIndex(
                name: "IX_OpportunityStages_TenantId",
                schema: "crm",
                table: "OpportunityStages");

            migrationBuilder.DropIndex(
                name: "IX_OpportunityStageHistories_TenantId",
                schema: "crm",
                table: "OpportunityStageHistories");

            migrationBuilder.DropIndex(
                name: "IX_Opportunities_TenantId",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropIndex(
                name: "IX_LeadStatusHistories_TenantId",
                schema: "crm",
                table: "LeadStatusHistories");

            migrationBuilder.DropIndex(
                name: "IX_LeadStatuses_TenantId",
                schema: "crm",
                table: "LeadStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Leads_TenantId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropIndex(
                name: "IX_CustomFieldValues_TenantId",
                schema: "crm",
                table: "CustomFieldValues");

            migrationBuilder.DropIndex(
                name: "IX_CustomFieldDefinitions_TenantId",
                schema: "crm",
                table: "CustomFieldDefinitions");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_TenantId",
                schema: "crm",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Activities_TenantId",
                schema: "crm",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_TenantId",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "identity",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "identity",
                table: "UserRoles");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "identity",
                table: "RolePermissions");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "OpportunityStages");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "OpportunityStageHistories");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "LeadStatusHistories");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "LeadStatuses");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "CustomFieldValues");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "CustomFieldDefinitions");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "TenantId",
                schema: "crm",
                table: "Accounts");
        }
    }
}
