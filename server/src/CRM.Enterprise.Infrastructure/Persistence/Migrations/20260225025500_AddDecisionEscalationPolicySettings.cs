using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(CrmDbContext))]
    [Migration("20260225025500_AddDecisionEscalationPolicySettings")]
    public partial class AddDecisionEscalationPolicySettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DecisionEscalationPolicyJson",
                schema: "identity",
                table: "Tenants",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DecisionEscalationPolicyJson",
                schema: "identity",
                table: "Tenants");
        }
    }
}
