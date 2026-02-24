using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using CRM.Enterprise.Infrastructure.Persistence;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations;

[DbContext(typeof(CrmDbContext))]
[Migration("20260224030000_AddDecisionInboxGenericEngineTables")]
public partial class AddDecisionInboxGenericEngineTables : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "DecisionRequests",
            schema: "crm",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                LegacyApprovalId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                LegacyApprovalChainId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                Type = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                EntityType = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                EntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Status = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                Priority = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                RiskLevel = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                RequestedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                RequestedOnUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                DueAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                CompletedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                PolicyReason = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                PayloadJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                PolicySnapshotJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                table.PrimaryKey("PK_DecisionRequests", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "DecisionActionLogs",
            schema: "crm",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                DecisionRequestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Action = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                ActorUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                ActorName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Field = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                OldValue = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                NewValue = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                ActionAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                table.PrimaryKey("PK_DecisionActionLogs", x => x.Id);
                table.ForeignKey(
                    name: "FK_DecisionActionLogs_DecisionRequests_DecisionRequestId",
                    column: x => x.DecisionRequestId,
                    principalSchema: "crm",
                    principalTable: "DecisionRequests",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "DecisionSteps",
            schema: "crm",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                DecisionRequestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                StepOrder = table.Column<int>(type: "int", nullable: false),
                StepType = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                Status = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                ApproverRole = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                AssigneeUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                DueAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                CompletedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                AssigneeNameSnapshot = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
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
                table.PrimaryKey("PK_DecisionSteps", x => x.Id);
                table.ForeignKey(
                    name: "FK_DecisionSteps_DecisionRequests_DecisionRequestId",
                    column: x => x.DecisionRequestId,
                    principalSchema: "crm",
                    principalTable: "DecisionRequests",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_DecisionRequests_TenantId_CreatedAtUtc",
            schema: "crm",
            table: "DecisionRequests",
            columns: new[] { "TenantId", "Status", "CreatedAtUtc" });

        migrationBuilder.CreateIndex(
            name: "IX_DecisionRequests_TenantId_EntityType_EntityId",
            schema: "crm",
            table: "DecisionRequests",
            columns: new[] { "TenantId", "EntityType", "EntityId" });

        migrationBuilder.CreateIndex(
            name: "IX_DecisionRequests_TenantId_LegacyApprovalId",
            schema: "crm",
            table: "DecisionRequests",
            columns: new[] { "TenantId", "LegacyApprovalId" },
            filter: "[LegacyApprovalId] IS NOT NULL AND [IsDeleted] = 0");

        migrationBuilder.CreateIndex(
            name: "IX_DecisionActionLogs_TenantId_DecisionRequestId_ActionAtUtc",
            schema: "crm",
            table: "DecisionActionLogs",
            columns: new[] { "TenantId", "DecisionRequestId", "ActionAtUtc" });

        migrationBuilder.CreateIndex(
            name: "IX_DecisionActionLogs_DecisionRequestId",
            schema: "crm",
            table: "DecisionActionLogs",
            column: "DecisionRequestId");

        migrationBuilder.CreateIndex(
            name: "IX_DecisionSteps_TenantId_DecisionRequestId_StepOrder",
            schema: "crm",
            table: "DecisionSteps",
            columns: new[] { "TenantId", "DecisionRequestId", "StepOrder" },
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_DecisionSteps_DecisionRequestId",
            schema: "crm",
            table: "DecisionSteps",
            column: "DecisionRequestId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "DecisionActionLogs",
            schema: "crm");

        migrationBuilder.DropTable(
            name: "DecisionSteps",
            schema: "crm");

        migrationBuilder.DropTable(
            name: "DecisionRequests",
            schema: "crm");
    }
}
