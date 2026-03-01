using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserEmailConnections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmailTemplates",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    HtmlBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextBody = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsSystem = table.Column<bool>(type: "bit", nullable: false),
                    Variables = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    UsageCount = table.Column<int>(type: "int", nullable: false),
                    LastUsedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_EmailTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserEmailConnections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Provider = table.Column<int>(type: "int", nullable: false),
                    EmailAddress = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    AccessTokenEncrypted = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    RefreshTokenEncrypted = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    TokenExpiresAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Scopes = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    LastSyncAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastError = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    FailureCount = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_UserEmailConnections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserEmailConnections_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmailLogs",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ToName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CcEmails = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    BccEmails = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    HtmlBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextBody = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    MessageId = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ExternalId = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ErrorMessage = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    RetryCount = table.Column<int>(type: "int", nullable: false),
                    SentAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeliveredAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OpenedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClickedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BouncedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BounceReason = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    RelatedEntityType = table.Column<int>(type: "int", nullable: true),
                    RelatedEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TemplateId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SenderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_EmailLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmailLogs_EmailTemplates_TemplateId",
                        column: x => x.TemplateId,
                        principalSchema: "crm",
                        principalTable: "EmailTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_EmailLogs_Users_SenderId",
                        column: x => x.SenderId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_MessageId",
                schema: "crm",
                table: "EmailLogs",
                column: "MessageId",
                filter: "[MessageId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_SenderId",
                schema: "crm",
                table: "EmailLogs",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_TemplateId",
                schema: "crm",
                table: "EmailLogs",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_TenantId",
                schema: "crm",
                table: "EmailLogs",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_TenantId_RelatedEntityType_RelatedEntityId",
                schema: "crm",
                table: "EmailLogs",
                columns: new[] { "TenantId", "RelatedEntityType", "RelatedEntityId" },
                filter: "[RelatedEntityId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_TenantId_Status",
                schema: "crm",
                table: "EmailLogs",
                columns: new[] { "TenantId", "Status" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmailLogs_TenantId_ToEmail",
                schema: "crm",
                table: "EmailLogs",
                columns: new[] { "TenantId", "ToEmail" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_TenantId",
                schema: "crm",
                table: "EmailTemplates",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_TenantId_Category",
                schema: "crm",
                table: "EmailTemplates",
                columns: new[] { "TenantId", "Category" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_TenantId_IsActive",
                schema: "crm",
                table: "EmailTemplates",
                columns: new[] { "TenantId", "IsActive" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_TenantId_Name",
                schema: "crm",
                table: "EmailTemplates",
                columns: new[] { "TenantId", "Name" },
                unique: true,
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_UserEmailConnections_TenantId",
                table: "UserEmailConnections",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_UserEmailConnections_TenantId_UserId",
                table: "UserEmailConnections",
                columns: new[] { "TenantId", "UserId" },
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_UserEmailConnections_TenantId_UserId_Provider",
                table: "UserEmailConnections",
                columns: new[] { "TenantId", "UserId", "Provider" },
                unique: true,
                filter: "[IsDeleted] = 0");

            migrationBuilder.CreateIndex(
                name: "IX_UserEmailConnections_UserId",
                table: "UserEmailConnections",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmailLogs",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "UserEmailConnections");

            migrationBuilder.DropTable(
                name: "EmailTemplates",
                schema: "crm");
        }
    }
}
