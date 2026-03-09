using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(CrmDbContext))]
    [Migration("20260309152000_AddLeadDispositionPolicySettings")]
    public partial class AddLeadDispositionPolicySettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LeadDispositionPolicyJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeadDispositionPolicyJson",
                schema: "identity",
                table: "Tenants");
        }
    }
}
