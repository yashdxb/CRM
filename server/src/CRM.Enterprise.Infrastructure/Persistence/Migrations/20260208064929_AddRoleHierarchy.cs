using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleHierarchy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HierarchyLevel",
                schema: "identity",
                table: "Roles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HierarchyPath",
                schema: "identity",
                table: "Roles",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ParentRoleId",
                schema: "identity",
                table: "Roles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.Sql(@"
UPDATE [identity].[Roles]
SET HierarchyLevel = 1,
    HierarchyPath = CAST(Id AS nvarchar(450))
WHERE HierarchyLevel IS NULL AND HierarchyPath IS NULL;");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_ParentRoleId",
                schema: "identity",
                table: "Roles",
                column: "ParentRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_TenantId_HierarchyPath",
                schema: "identity",
                table: "Roles",
                columns: new[] { "TenantId", "HierarchyPath" },
                filter: "[HierarchyPath] IS NOT NULL AND [IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_TenantId_ParentRoleId",
                schema: "identity",
                table: "Roles",
                columns: new[] { "TenantId", "ParentRoleId" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Roles_ParentRoleId",
                schema: "identity",
                table: "Roles",
                column: "ParentRoleId",
                principalSchema: "identity",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Roles_ParentRoleId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_ParentRoleId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_TenantId_HierarchyPath",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_TenantId_ParentRoleId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "HierarchyLevel",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "HierarchyPath",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "ParentRoleId",
                schema: "identity",
                table: "Roles");
        }
    }
}
