using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    public partial class AddActivityNextStepFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NextStepSubject",
                schema: "crm",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NextStepDueDateUtc",
                schema: "crm",
                table: "Activities",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextStepSubject",
                schema: "crm",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "NextStepDueDateUtc",
                schema: "crm",
                table: "Activities");
        }
    }
}
