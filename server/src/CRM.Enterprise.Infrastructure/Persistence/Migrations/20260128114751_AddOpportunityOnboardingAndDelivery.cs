using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityOnboardingAndDelivery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeliveryCompletedAtUtc",
                schema: "crm",
                table: "Opportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryHandoffRisks",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryHandoffScope",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryHandoffTimeline",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryOwnerId",
                schema: "crm",
                table: "Opportunities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeliveryStatus",
                schema: "crm",
                table: "Opportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OpportunityOnboardingItems",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DueDateUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_OpportunityOnboardingItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpportunityOnboardingItems_Opportunities_OpportunityId",
                        column: x => x.OpportunityId,
                        principalSchema: "crm",
                        principalTable: "Opportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityOnboardingItems_OpportunityId_Type_Title",
                schema: "crm",
                table: "OpportunityOnboardingItems",
                columns: new[] { "OpportunityId", "Type", "Title" });

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityOnboardingItems_TenantId",
                schema: "crm",
                table: "OpportunityOnboardingItems",
                column: "TenantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpportunityOnboardingItems",
                schema: "crm");

            migrationBuilder.DropColumn(
                name: "DeliveryCompletedAtUtc",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "DeliveryHandoffRisks",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "DeliveryHandoffScope",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "DeliveryHandoffTimeline",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "DeliveryOwnerId",
                schema: "crm",
                table: "Opportunities");

            migrationBuilder.DropColumn(
                name: "DeliveryStatus",
                schema: "crm",
                table: "Opportunities");
        }
    }
}
