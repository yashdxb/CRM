using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityQuotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OpportunityQuotes",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuoteNumber = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    PriceListId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Currency = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TaxAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
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
                    table.PrimaryKey("PK_OpportunityQuotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpportunityQuotes_Opportunities_OpportunityId",
                        column: x => x.OpportunityId,
                        principalSchema: "crm",
                        principalTable: "Opportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OpportunityQuotes_PriceLists_PriceListId",
                        column: x => x.PriceListId,
                        principalSchema: "scm",
                        principalTable: "PriceLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "OpportunityQuoteLines",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OpportunityQuoteId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemMasterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,3)", precision: 18, scale: 3, nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DiscountPercent = table.Column<decimal>(type: "decimal(5,2)", precision: 5, scale: 2, nullable: false),
                    LineTotal = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
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
                    table.PrimaryKey("PK_OpportunityQuoteLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpportunityQuoteLines_ItemMasters_ItemMasterId",
                        column: x => x.ItemMasterId,
                        principalSchema: "scm",
                        principalTable: "ItemMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OpportunityQuoteLines_OpportunityQuotes_OpportunityQuoteId",
                        column: x => x.OpportunityQuoteId,
                        principalSchema: "crm",
                        principalTable: "OpportunityQuotes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuoteLines_ItemMasterId",
                schema: "crm",
                table: "OpportunityQuoteLines",
                column: "ItemMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuoteLines_OpportunityQuoteId",
                schema: "crm",
                table: "OpportunityQuoteLines",
                column: "OpportunityQuoteId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuoteLines_TenantId",
                schema: "crm",
                table: "OpportunityQuoteLines",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuoteLines_TenantId_OpportunityQuoteId_ItemMasterId",
                schema: "crm",
                table: "OpportunityQuoteLines",
                columns: new[] { "TenantId", "OpportunityQuoteId", "ItemMasterId" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuotes_OpportunityId",
                schema: "crm",
                table: "OpportunityQuotes",
                column: "OpportunityId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuotes_PriceListId",
                schema: "crm",
                table: "OpportunityQuotes",
                column: "PriceListId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuotes_TenantId",
                schema: "crm",
                table: "OpportunityQuotes",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_OpportunityQuotes_TenantId_OpportunityId_QuoteNumber",
                schema: "crm",
                table: "OpportunityQuotes",
                columns: new[] { "TenantId", "OpportunityId", "QuoteNumber" },
                unique: true,
                filter: "[IsDeleted] = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpportunityQuoteLines",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "OpportunityQuotes",
                schema: "crm");
        }
    }
}
