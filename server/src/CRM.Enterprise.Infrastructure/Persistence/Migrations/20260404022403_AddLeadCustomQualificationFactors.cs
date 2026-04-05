using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadCustomQualificationFactors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomQualificationFactorsJson",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomQualificationFactorsJson",
                schema: "crm",
                table: "Leads");
        }
    }
}
