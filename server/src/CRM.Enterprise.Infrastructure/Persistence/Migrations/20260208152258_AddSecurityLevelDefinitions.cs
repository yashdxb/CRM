using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSecurityLevelDefinitions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SecurityLevelId",
                schema: "identity",
                table: "Roles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SecurityLevelDefinitions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecurityLevelDefinitions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Roles_SecurityLevelId",
                schema: "identity",
                table: "Roles",
                column: "SecurityLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_SecurityLevelDefinitions_TenantId",
                table: "SecurityLevelDefinitions",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SecurityLevelDefinitions_TenantId_IsDefault",
                table: "SecurityLevelDefinitions",
                columns: new[] { "TenantId", "IsDefault" },
                filter: "[IsDefault] = 1 AND [IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_SecurityLevelDefinitions_TenantId_Name",
                table: "SecurityLevelDefinitions",
                columns: new[] { "TenantId", "Name" },
                unique: true,
                filter: "[IsDeleted] = 0");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_SecurityLevelDefinitions_SecurityLevelId",
                schema: "identity",
                table: "Roles",
                column: "SecurityLevelId",
                principalTable: "SecurityLevelDefinitions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_SecurityLevelDefinitions_SecurityLevelId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropTable(
                name: "SecurityLevelDefinitions");

            migrationBuilder.DropIndex(
                name: "IX_Roles_SecurityLevelId",
                schema: "identity",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "SecurityLevelId",
                schema: "identity",
                table: "Roles");
        }
    }
}
