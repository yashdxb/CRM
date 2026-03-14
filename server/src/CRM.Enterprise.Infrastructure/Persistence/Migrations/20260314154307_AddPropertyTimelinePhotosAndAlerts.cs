using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPropertyTimelinePhotosAndAlerts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PropertyAlertRules",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ClientEmail = table.Column<string>(type: "nvarchar(320)", maxLength: 320, nullable: false),
                    CriteriaJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Frequency = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    MatchCount = table.Column<int>(type: "int", nullable: false),
                    LastNotifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_PropertyAlertRules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyAlertRules_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalSchema: "crm",
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PropertyEvents",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EventType = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Label = table.Column<string>(type: "nvarchar(160)", maxLength: 160, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Variant = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    OccurredAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_PropertyEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyEvents_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalSchema: "crm",
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PropertyAlertNotifications",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RuleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ClientEmail = table.Column<string>(type: "nvarchar(320)", maxLength: 320, nullable: false),
                    MatchedProperties = table.Column<int>(type: "int", nullable: false),
                    SentAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    TriggeredBy = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
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
                    table.PrimaryKey("PK_PropertyAlertNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyAlertNotifications_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalSchema: "crm",
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PropertyAlertNotifications_PropertyAlertRules_RuleId",
                        column: x => x.RuleId,
                        principalSchema: "crm",
                        principalTable: "PropertyAlertRules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertNotifications_PropertyId",
                schema: "crm",
                table: "PropertyAlertNotifications",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertNotifications_RuleId",
                schema: "crm",
                table: "PropertyAlertNotifications",
                column: "RuleId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertNotifications_TenantId",
                schema: "crm",
                table: "PropertyAlertNotifications",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertNotifications_TenantId_PropertyId_SentAtUtc",
                schema: "crm",
                table: "PropertyAlertNotifications",
                columns: new[] { "TenantId", "PropertyId", "SentAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertRules_PropertyId",
                schema: "crm",
                table: "PropertyAlertRules",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertRules_TenantId",
                schema: "crm",
                table: "PropertyAlertRules",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyAlertRules_TenantId_PropertyId_IsActive",
                schema: "crm",
                table: "PropertyAlertRules",
                columns: new[] { "TenantId", "PropertyId", "IsActive" });

            migrationBuilder.CreateIndex(
                name: "IX_PropertyEvents_PropertyId",
                schema: "crm",
                table: "PropertyEvents",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyEvents_TenantId",
                schema: "crm",
                table: "PropertyEvents",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyEvents_TenantId_PropertyId_OccurredAtUtc",
                schema: "crm",
                table: "PropertyEvents",
                columns: new[] { "TenantId", "PropertyId", "OccurredAtUtc" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PropertyAlertNotifications",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "PropertyEvents",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "PropertyAlertRules",
                schema: "crm");
        }
    }
}
