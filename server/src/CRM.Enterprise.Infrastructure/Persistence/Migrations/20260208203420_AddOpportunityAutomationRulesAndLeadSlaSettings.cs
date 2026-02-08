using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityAutomationRulesAndLeadSlaSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LeadFirstTouchSlaHours",
                schema: "identity",
                table: "Tenants",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OpportunityStageAutomationRules",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StageName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TaskSubject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaskDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DueInDays = table.Column<int>(type: "int", nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpportunityStageAutomationRules", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityStageAutomationRules_TenantId",
                schema: "crm",
                table: "OpportunityStageAutomationRules",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityStageAutomationRules_TenantId_StageName_Name",
                schema: "crm",
                table: "OpportunityStageAutomationRules",
                columns: new[] { "TenantId", "StageName", "Name" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpportunityStageAutomationRules",
                schema: "crm");

            migrationBuilder.DropColumn(
                name: "LeadFirstTouchSlaHours",
                schema: "identity",
                table: "Tenants");
        }
    }
}
