using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixPropertyAlertNotificationCascadePath : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PropertyAlertNotifications_PropertyAlertRules_RuleId",
                schema: "crm",
                table: "PropertyAlertNotifications");

            migrationBuilder.AddForeignKey(
                name: "FK_PropertyAlertNotifications_PropertyAlertRules_RuleId",
                schema: "crm",
                table: "PropertyAlertNotifications",
                column: "RuleId",
                principalSchema: "crm",
                principalTable: "PropertyAlertRules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PropertyAlertNotifications_PropertyAlertRules_RuleId",
                schema: "crm",
                table: "PropertyAlertNotifications");

            migrationBuilder.AddForeignKey(
                name: "FK_PropertyAlertNotifications_PropertyAlertRules_RuleId",
                schema: "crm",
                table: "PropertyAlertNotifications",
                column: "RuleId",
                principalSchema: "crm",
                principalTable: "PropertyAlertRules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
