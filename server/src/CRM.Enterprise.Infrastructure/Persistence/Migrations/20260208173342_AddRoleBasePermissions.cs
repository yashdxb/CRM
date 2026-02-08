using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleBasePermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BasePermissionsJson",
                schema: "identity",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BasePermissionsUpdatedAtUtc",
                schema: "identity",
                table: "Roles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DriftAcceptedAtUtc",
                schema: "identity",
                table: "Roles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriftAcceptedBy",
                schema: "identity",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DriftNotes",
                schema: "identity",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BasePermissionsJson",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "BasePermissionsUpdatedAtUtc",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "DriftAcceptedAtUtc",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "DriftAcceptedBy",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "DriftNotes",
                schema: "identity",
                table: "Roles");
        }
    }
}
