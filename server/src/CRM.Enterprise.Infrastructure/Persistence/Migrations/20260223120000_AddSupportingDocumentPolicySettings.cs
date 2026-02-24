using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;
using CRM.Enterprise.Infrastructure.Persistence;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations;

[DbContext(typeof(CrmDbContext))]
[Migration("20260223120000_AddSupportingDocumentPolicySettings")]
public partial class AddSupportingDocumentPolicySettings : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "SupportingDocumentPolicyJson",
            schema: "identity",
            table: "Tenants",
            type: "nvarchar(max)",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "SupportingDocumentPolicyJson",
            schema: "identity",
            table: "Tenants");
    }
}
