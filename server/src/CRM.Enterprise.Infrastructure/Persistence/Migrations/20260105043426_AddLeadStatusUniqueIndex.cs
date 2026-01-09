using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadStatusUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupplierQuoteLines_RfqLines_RfqLineId",
                schema: "scm",
                table: "SupplierQuoteLines");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "crm",
                table: "LeadStatuses",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.Sql(
                """
                WITH ranked AS (
                    SELECT
                        Id,
                        TenantId,
                        Name,
                        ROW_NUMBER() OVER (
                            PARTITION BY TenantId, Name
                            ORDER BY CreatedAtUtc, Id
                        ) AS rn,
                        MIN(Id) OVER (PARTITION BY TenantId, Name) AS canonical_id
                    FROM crm.LeadStatuses
                )
                UPDATE l
                SET l.LeadStatusId = r.canonical_id
                FROM crm.Leads l
                INNER JOIN ranked r ON r.Id = l.LeadStatusId
                WHERE r.rn > 1 AND r.Id <> r.canonical_id;

                WITH ranked AS (
                    SELECT
                        Id,
                        TenantId,
                        Name,
                        ROW_NUMBER() OVER (
                            PARTITION BY TenantId, Name
                            ORDER BY CreatedAtUtc, Id
                        ) AS rn,
                        MIN(Id) OVER (PARTITION BY TenantId, Name) AS canonical_id
                    FROM crm.LeadStatuses
                )
                UPDATE h
                SET h.LeadStatusId = r.canonical_id
                FROM crm.LeadStatusHistories h
                INNER JOIN ranked r ON r.Id = h.LeadStatusId
                WHERE r.rn > 1 AND r.Id <> r.canonical_id;

                WITH ranked AS (
                    SELECT
                        Id,
                        TenantId,
                        Name,
                        ROW_NUMBER() OVER (
                            PARTITION BY TenantId, Name
                            ORDER BY CreatedAtUtc, Id
                        ) AS rn
                    FROM crm.LeadStatuses
                )
                DELETE ls
                FROM crm.LeadStatuses ls
                INNER JOIN ranked r ON r.Id = ls.Id
                WHERE r.rn > 1;
                """);

            migrationBuilder.CreateIndex(
                name: "IX_LeadStatuses_TenantId_Name",
                schema: "crm",
                table: "LeadStatuses",
                columns: new[] { "TenantId", "Name" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SupplierQuoteLines_RfqLines_RfqLineId",
                schema: "scm",
                table: "SupplierQuoteLines",
                column: "RfqLineId",
                principalSchema: "scm",
                principalTable: "RfqLines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupplierQuoteLines_RfqLines_RfqLineId",
                schema: "scm",
                table: "SupplierQuoteLines");

            migrationBuilder.DropIndex(
                name: "IX_LeadStatuses_TenantId_Name",
                schema: "crm",
                table: "LeadStatuses");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                schema: "crm",
                table: "LeadStatuses",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_SupplierQuoteLines_RfqLines_RfqLineId",
                schema: "scm",
                table: "SupplierQuoteLines",
                column: "RfqLineId",
                principalSchema: "scm",
                principalTable: "RfqLines",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
