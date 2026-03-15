using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddFirmographicAndAddressFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountSource",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccountType",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AnnualRevenue",
                schema: "crm",
                table: "Accounts",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillingCity",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillingCountry",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillingPostalCode",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillingState",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillingStreet",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfEmployees",
                schema: "crm",
                table: "Accounts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rating",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingCity",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingCountry",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingPostalCode",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingState",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingStreet",
                schema: "crm",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountSource",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "AccountType",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "AnnualRevenue",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "BillingCity",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "BillingCountry",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "BillingPostalCode",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "BillingState",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "BillingStreet",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "NumberOfEmployees",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "Rating",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ShippingCity",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ShippingCountry",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ShippingPostalCode",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ShippingState",
                schema: "crm",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "ShippingStreet",
                schema: "crm",
                table: "Accounts");
        }
    }
}
