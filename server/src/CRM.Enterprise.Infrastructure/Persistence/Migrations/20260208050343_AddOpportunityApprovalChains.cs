using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityApprovalChains : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ApprovalChainId",
                schema: "crm",
                table: "OpportunityApprovals",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StepOrder",
                schema: "crm",
                table: "OpportunityApprovals",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateTable(
                name: "OpportunityApprovalChains",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequestedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentStep = table.Column<int>(type: "int", nullable: false),
                    TotalSteps = table.Column<int>(type: "int", nullable: false),
                    StepsJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RequestedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CompletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_OpportunityApprovalChains", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpportunityApprovalChains_Opportunities_OpportunityId",
                        column: x => x.OpportunityId,
                        principalSchema: "crm",
                        principalTable: "Opportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityApprovals_ApprovalChainId",
                schema: "crm",
                table: "OpportunityApprovals",
                column: "ApprovalChainId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityApprovalChains_OpportunityId",
                schema: "crm",
                table: "OpportunityApprovalChains",
                column: "OpportunityId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityApprovalChains_TenantId",
                schema: "crm",
                table: "OpportunityApprovalChains",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_OpportunityApprovals_OpportunityApprovalChains_ApprovalChainId",
                schema: "crm",
                table: "OpportunityApprovals",
                column: "ApprovalChainId",
                principalSchema: "crm",
                principalTable: "OpportunityApprovalChains",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OpportunityApprovals_OpportunityApprovalChains_ApprovalChainId",
                schema: "crm",
                table: "OpportunityApprovals");

            migrationBuilder.DropTable(
                name: "OpportunityApprovalChains",
                schema: "crm");

            migrationBuilder.DropIndex(
                name: "IX_OpportunityApprovals_ApprovalChainId",
                schema: "crm",
                table: "OpportunityApprovals");

            migrationBuilder.DropColumn(
                name: "ApprovalChainId",
                schema: "crm",
                table: "OpportunityApprovals");

            migrationBuilder.DropColumn(
                name: "StepOrder",
                schema: "crm",
                table: "OpportunityApprovals");
        }
    }
}
