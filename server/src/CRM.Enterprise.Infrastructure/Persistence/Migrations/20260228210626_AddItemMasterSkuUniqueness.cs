using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddItemMasterSkuUniqueness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ItemMasters_TenantId_Sku_IsDeleted",
                schema: "scm",
                table: "ItemMasters",
                columns: new[] { "TenantId", "Sku", "IsDeleted" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ItemMasters_TenantId_Sku_IsDeleted",
                schema: "scm",
                table: "ItemMasters");
        }
    }
}
