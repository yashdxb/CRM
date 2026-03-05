using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHelpDeskClosureAndCsat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClosureReason",
                schema: "crm",
                table: "SupportCases",
                type: "nvarchar(120)",
                maxLength: 120,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CsatFeedback",
                schema: "crm",
                table: "SupportCases",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CsatScore",
                schema: "crm",
                table: "SupportCases",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClosureReason",
                schema: "crm",
                table: "SupportCases");

            migrationBuilder.DropColumn(
                name: "CsatFeedback",
                schema: "crm",
                table: "SupportCases");

            migrationBuilder.DropColumn(
                name: "CsatScore",
                schema: "crm",
                table: "SupportCases");
        }
    }
}
