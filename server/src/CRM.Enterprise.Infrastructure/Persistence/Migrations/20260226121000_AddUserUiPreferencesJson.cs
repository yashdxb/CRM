using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;
using CRM.Enterprise.Infrastructure.Persistence;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations;

[DbContext(typeof(CrmDbContext))]
[Migration("20260226121000_AddUserUiPreferencesJson")]
public partial class AddUserUiPreferencesJson : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "UiPreferencesJson",
            schema: "identity",
            table: "Users",
            type: "nvarchar(max)",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "UiPreferencesJson",
            schema: "identity",
            table: "Users");
    }
}
