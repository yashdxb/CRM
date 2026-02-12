using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadPhoneType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PhoneTypeId",
                schema: "crm",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PhoneTypes",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Leads_PhoneTypeId",
                schema: "crm",
                table: "Leads",
                column: "PhoneTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneTypes_Name",
                schema: "crm",
                table: "PhoneTypes",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_PhoneTypes_PhoneTypeId",
                schema: "crm",
                table: "Leads",
                column: "PhoneTypeId",
                principalSchema: "crm",
                principalTable: "PhoneTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_PhoneTypes_PhoneTypeId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropTable(
                name: "PhoneTypes",
                schema: "crm");

            migrationBuilder.DropIndex(
                name: "IX_Leads_PhoneTypeId",
                schema: "crm",
                table: "Leads");

            migrationBuilder.DropColumn(
                name: "PhoneTypeId",
                schema: "crm",
                table: "Leads");
        }
    }
}
