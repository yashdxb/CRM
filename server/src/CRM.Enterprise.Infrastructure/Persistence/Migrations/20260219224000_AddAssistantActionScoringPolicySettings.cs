using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations;

public partial class AddAssistantActionScoringPolicySettings : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "AssistantActionScoringPolicyJson",
            schema: "identity",
            table: "Tenants",
            type: "nvarchar(max)",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "AssistantActionScoringPolicyJson",
            schema: "identity",
            table: "Tenants");
    }
}
