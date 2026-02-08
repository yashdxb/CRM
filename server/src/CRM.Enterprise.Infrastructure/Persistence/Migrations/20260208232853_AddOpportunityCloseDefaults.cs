using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOpportunityCloseDefaults : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DefaultContractTermMonths",
                schema: "identity",
                table: "Tenants",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DefaultDeliveryOwnerRoleId",
                schema: "identity",
                table: "Tenants",
                type: "uniqueidentifier",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DefaultContractTermMonths",
                schema: "identity",
                table: "Tenants");

            migrationBuilder.DropColumn(
                name: "DefaultDeliveryOwnerRoleId",
                schema: "identity",
                table: "Tenants");
        }
    }
}
