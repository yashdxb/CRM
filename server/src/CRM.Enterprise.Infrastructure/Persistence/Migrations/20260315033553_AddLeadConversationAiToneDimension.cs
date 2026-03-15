using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadConversationAiToneDimension : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConversationAiBuyingReadiness",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ConversationAiDimensionScore",
                schema: "crm",
                table: "Leads",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationAiSemanticIntent",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationAiToneJustification",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationAiToneLabel",
                schema: "crm",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConversationAiBuyingReadiness",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiDimensionScore",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiSemanticIntent",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiToneJustification",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "ConversationAiToneLabel",
                schema: "crm",
                table: "Leads");
        }
    }
}
