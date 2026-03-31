using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTenantRecordNumbering : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RecordNumberingPolicyJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LeadNumber",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TenantRecordNumberCounters",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ModuleKey = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    NextValue = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_TenantRecordNumberCounters", x => x.Id);
                });

            migrationBuilder.Sql("""
                ;WITH LeadSequence AS (
                    SELECT
                        Id,
                        TenantId,
                        ROW_NUMBER() OVER (PARTITION BY TenantId ORDER BY CreatedAtUtc, Id) AS SequenceNumber
                    FROM crm.Leads
                )
                UPDATE lead
                SET LeadNumber = CONCAT('LEA-', RIGHT(CONCAT('000000', CAST(sequence.SequenceNumber AS varchar(20))), 6))
                FROM crm.Leads AS lead
                INNER JOIN LeadSequence AS sequence ON sequence.Id = lead.Id;
                """);

            migrationBuilder.Sql("""
                INSERT INTO crm.TenantRecordNumberCounters
                    (Id, ModuleKey, NextValue, TenantId, CreatedAtUtc, CreatedBy, IsDeleted)
                SELECT
                    NEWID(),
                    'Leads',
                    MAX(sequence.SequenceNumber) + 1,
                    sequence.TenantId,
                    SYSUTCDATETIME(),
                    'migration',
                    0
                FROM (
                    SELECT
                        TenantId,
                        ROW_NUMBER() OVER (PARTITION BY TenantId ORDER BY CreatedAtUtc, Id) AS SequenceNumber
                    FROM crm.Leads
                ) AS sequence
                GROUP BY sequence.TenantId;
                """);

            migrationBuilder.AlterColumn<string>(
                name: "LeadNumber",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)",
                oldMaxLength: 40,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Leads_TenantId_LeadNumber",
                schema: "crm",
                table: "Leads",
                columns: new[] { "TenantId", "LeadNumber" },
                unique: true,
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_TenantRecordNumberCounters_TenantId",
                schema: "crm",
                table: "TenantRecordNumberCounters",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_TenantRecordNumberCounters_TenantId_ModuleKey",
                schema: "crm",
                table: "TenantRecordNumberCounters",
                columns: new[] { "TenantId", "ModuleKey" },
                unique: true,
                filter: "[IsDeleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TenantRecordNumberCounters",
                schema: "crm");

            migrationBuilder.DropIndex(
                name: "IX_Leads_TenantId_LeadNumber",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "RecordNumberingPolicyJson",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "LeadNumber",
                schema: "crm",
                table: "Leads");
        }
    }
}
