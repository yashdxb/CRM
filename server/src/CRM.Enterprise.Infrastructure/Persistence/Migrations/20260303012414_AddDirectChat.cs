using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddDirectChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ItemType",
                schema: "scm",
                table: "ItemMasters",
                type: "nvarchar(24)",
                maxLength: 24,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "DirectChatThreads",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_DirectChatThreads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserMailMessages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConnectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExternalId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InternetMessageId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConversationId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BodyPreview = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BodyHtml = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodyText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ToRecipientsJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CcRecipientsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BccRecipientsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Folder = table.Column<int>(type: "int", nullable: false),
                    ExternalFolderId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    IsStarred = table.Column<bool>(type: "bit", nullable: false),
                    HasAttachments = table.Column<bool>(type: "bit", nullable: false),
                    AttachmentsJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Importance = table.Column<int>(type: "int", nullable: false),
                    ReceivedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SentAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDraft = table.Column<bool>(type: "bit", nullable: false),
                    LastSyncAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ChangeKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_UserMailMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMailMessages_UserEmailConnections_ConnectionId",
                        column: x => x.ConnectionId,
                        principalTable: "UserEmailConnections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DirectChatMessages",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
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
                    table.PrimaryKey("PK_DirectChatMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DirectChatMessages_DirectChatThreads_ThreadId",
                        column: x => x.ThreadId,
                        principalSchema: "crm",
                        principalTable: "DirectChatThreads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DirectChatParticipants",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false),
                    ArchivedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastClearedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastReadAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_DirectChatParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DirectChatParticipants_DirectChatThreads_ThreadId",
                        column: x => x.ThreadId,
                        principalSchema: "crm",
                        principalTable: "DirectChatThreads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DirectChatMessages_TenantId",
                schema: "crm",
                table: "DirectChatMessages",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectChatMessages_ThreadId_CreatedAtUtc",
                schema: "crm",
                table: "DirectChatMessages",
                columns: new[] { "ThreadId", "CreatedAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_DirectChatParticipants_TenantId",
                schema: "crm",
                table: "DirectChatParticipants",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_DirectChatParticipants_ThreadId_UserId",
                schema: "crm",
                table: "DirectChatParticipants",
                columns: new[] { "ThreadId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DirectChatParticipants_UserId_IsArchived",
                schema: "crm",
                table: "DirectChatParticipants",
                columns: new[] { "UserId", "IsArchived" });

            migrationBuilder.CreateIndex(
                name: "IX_DirectChatThreads_TenantId",
                schema: "crm",
                table: "DirectChatThreads",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMailMessages_ConnectionId",
                table: "UserMailMessages",
                column: "ConnectionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMailMessages_TenantId",
                table: "UserMailMessages",
                column: "TenantId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DirectChatMessages",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "DirectChatParticipants",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "UserMailMessages");

            migrationBuilder.DropTable(
                name: "DirectChatThreads",
                schema: "crm");

            migrationBuilder.DropColumn(
                name: "ItemType",
                schema: "scm",
                table: "ItemMasters");
        }
    }
}
