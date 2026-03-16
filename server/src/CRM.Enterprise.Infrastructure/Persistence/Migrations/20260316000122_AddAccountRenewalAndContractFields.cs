using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountRenewalAndContractFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ContractEndDateUtc",
                schema: "crm",
                table: "Accounts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RenewalDateUtc",
                schema: "crm",
                table: "Accounts",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContractEndDateUtc",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "RenewalDateUtc",
                schema: "crm",
                table: "Accounts");
        }
    }
}
