using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddActivityTypeDefinitionAuditFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "ActivityTypes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ActivityTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAtUtc",
                table: "ActivityTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeletedBy",
                table: "ActivityTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ActivityTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "TenantId",
                table: "ActivityTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAtUtc",
                table: "ActivityTypes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "ActivityTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTypes_TenantId",
                table: "ActivityTypes",
                column: "TenantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ActivityTypes_TenantId",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "CreatedAtUtc",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "DeletedAtUtc",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedAtUtc",
                table: "ActivityTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ActivityTypes");
        }
    }
}
