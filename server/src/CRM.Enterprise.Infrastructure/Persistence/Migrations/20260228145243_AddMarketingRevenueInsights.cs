using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMarketingRevenueInsights : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AttributionExplainabilityEvents",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    SourceEntityType = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    SourceEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MemberAddedUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AttributedUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RuleVersion = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    EvidenceJson = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
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
                    table.PrimaryKey("PK_AttributionExplainabilityEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributionExplainabilityEvents_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalSchema: "crm",
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributionExplainabilityEvents_Opportunities_OpportunityId",
                        column: x => x.OpportunityId,
                        principalSchema: "crm",
                        principalTable: "Opportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignInsightSnapshots",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    Trend = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    CalculationWindowDays = table.Column<int>(type: "int", nullable: false),
                    ReasonChipsJson = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    MetricsJson = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    ComputedUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_CampaignInsightSnapshots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignInsightSnapshots_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalSchema: "crm",
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignRecommendations",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampaignId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(240)", maxLength: 240, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    ImpactEstimate = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Confidence = table.Column<decimal>(type: "decimal(4,3)", precision: 4, scale: 3, nullable: false),
                    EvidenceJson = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    GeneratedUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DecidedUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DecidedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DecisionReason = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
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
                    table.PrimaryKey("PK_CampaignRecommendations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignRecommendations_Campaigns_CampaignId",
                        column: x => x.CampaignId,
                        principalSchema: "crm",
                        principalTable: "Campaigns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CampaignRecommendationDecisions",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RecommendationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Decision = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DecidedUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DecidedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("PK_CampaignRecommendationDecisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampaignRecommendationDecisions_CampaignRecommendations_RecommendationId",
                        column: x => x.RecommendationId,
                        principalSchema: "crm",
                        principalTable: "CampaignRecommendations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttributionExplainabilityEvents_CampaignId",
                schema: "crm",
                table: "AttributionExplainabilityEvents",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributionExplainabilityEvents_OpportunityId",
                schema: "crm",
                table: "AttributionExplainabilityEvents",
                column: "OpportunityId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributionExplainabilityEvents_TenantId",
                schema: "crm",
                table: "AttributionExplainabilityEvents",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributionExplainabilityEvents_TenantId_OpportunityId_Model_AttributedUtc",
                schema: "crm",
                table: "AttributionExplainabilityEvents",
                columns: new[] { "TenantId", "OpportunityId", "Model", "AttributedUtc" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignInsightSnapshots_CampaignId",
                schema: "crm",
                table: "CampaignInsightSnapshots",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignInsightSnapshots_TenantId",
                schema: "crm",
                table: "CampaignInsightSnapshots",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignInsightSnapshots_TenantId_CampaignId_ComputedUtc",
                schema: "crm",
                table: "CampaignInsightSnapshots",
                columns: new[] { "TenantId", "CampaignId", "ComputedUtc" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignRecommendationDecisions_RecommendationId",
                schema: "crm",
                table: "CampaignRecommendationDecisions",
                column: "RecommendationId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignRecommendationDecisions_TenantId",
                schema: "crm",
                table: "CampaignRecommendationDecisions",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignRecommendationDecisions_TenantId_RecommendationId_DecidedUtc",
                schema: "crm",
                table: "CampaignRecommendationDecisions",
                columns: new[] { "TenantId", "RecommendationId", "DecidedUtc" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignRecommendations_CampaignId",
                schema: "crm",
                table: "CampaignRecommendations",
                column: "CampaignId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignRecommendations_TenantId",
                schema: "crm",
                table: "CampaignRecommendations",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_CampaignRecommendations_TenantId_CampaignId_Status_GeneratedUtc",
                schema: "crm",
                table: "CampaignRecommendations",
                columns: new[] { "TenantId", "CampaignId", "Status", "GeneratedUtc" },
                filter: "[IsDeleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttributionExplainabilityEvents",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "CampaignInsightSnapshots",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "CampaignRecommendationDecisions",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "CampaignRecommendations",
                schema: "crm");
        }
    }
}
