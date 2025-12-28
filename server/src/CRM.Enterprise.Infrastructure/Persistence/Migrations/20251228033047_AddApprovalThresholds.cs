using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddApprovalThresholds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ApprovalAmountThreshold",
                schema: "identity",
                table: "Tenants",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovalApproverRole",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalAmountThreshold",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "ApprovalApproverRole",
                schema: "identity",
                table: "Tenants");
        }
    }
}
