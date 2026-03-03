using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHelpDeskModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SupportQueues",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_SupportQueues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SupportSlaPolicies",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    FirstResponseTargetMinutes = table.Column<int>(type: "int", nullable: false),
                    ResolutionTargetMinutes = table.Column<int>(type: "int", nullable: false),
                    EscalationMinutes = table.Column<int>(type: "int", nullable: false),
                    BusinessHoursJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_SupportSlaPolicies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SupportQueueMembers",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QueueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_SupportQueueMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportQueueMembers_SupportQueues_QueueId",
                        column: x => x.QueueId,
                        principalSchema: "crm",
                        principalTable: "SupportQueues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupportQueueMembers_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SupportCases",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseNumber = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(240)", maxLength: 240, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Subcategory = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: true),
                    Source = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ContactId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    QueueId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OwnerUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SlaPolicyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstResponseDueUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ResolutionDueUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FirstRespondedUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResolvedUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ClosedUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_SupportCases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportCases_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "crm",
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SupportCases_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalSchema: "crm",
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SupportCases_SupportQueues_QueueId",
                        column: x => x.QueueId,
                        principalSchema: "crm",
                        principalTable: "SupportQueues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SupportCases_SupportSlaPolicies_SlaPolicyId",
                        column: x => x.SlaPolicyId,
                        principalSchema: "crm",
                        principalTable: "SupportSlaPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SupportCases_Users_OwnerUserId",
                        column: x => x.OwnerUserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SupportCaseComments",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsInternal = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_SupportCaseComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportCaseComments_SupportCases_CaseId",
                        column: x => x.CaseId,
                        principalSchema: "crm",
                        principalTable: "SupportCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupportCaseComments_Users_AuthorUserId",
                        column: x => x.AuthorUserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SupportCaseEscalationEvents",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    ActorUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OccurredUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_SupportCaseEscalationEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportCaseEscalationEvents_SupportCases_CaseId",
                        column: x => x.CaseId,
                        principalSchema: "crm",
                        principalTable: "SupportCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupportCaseEscalationEvents_Users_ActorUserId",
                        column: x => x.ActorUserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SupportEmailBindings",
                schema: "crm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExternalThreadKey = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastMessageUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_SupportEmailBindings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupportEmailBindings_SupportCases_CaseId",
                        column: x => x.CaseId,
                        principalSchema: "crm",
                        principalTable: "SupportCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseComments_AuthorUserId",
                schema: "crm",
                table: "SupportCaseComments",
                column: "AuthorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseComments_CaseId",
                schema: "crm",
                table: "SupportCaseComments",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseComments_TenantId",
                schema: "crm",
                table: "SupportCaseComments",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseComments_TenantId_CaseId_CreatedAtUtc",
                schema: "crm",
                table: "SupportCaseComments",
                columns: new[] { "TenantId", "CaseId", "CreatedAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseEscalationEvents_ActorUserId",
                schema: "crm",
                table: "SupportCaseEscalationEvents",
                column: "ActorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseEscalationEvents_CaseId",
                schema: "crm",
                table: "SupportCaseEscalationEvents",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseEscalationEvents_TenantId",
                schema: "crm",
                table: "SupportCaseEscalationEvents",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCaseEscalationEvents_TenantId_CaseId_OccurredUtc",
                schema: "crm",
                table: "SupportCaseEscalationEvents",
                columns: new[] { "TenantId", "CaseId", "OccurredUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_AccountId",
                schema: "crm",
                table: "SupportCases",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_ContactId",
                schema: "crm",
                table: "SupportCases",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_OwnerUserId",
                schema: "crm",
                table: "SupportCases",
                column: "OwnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_QueueId",
                schema: "crm",
                table: "SupportCases",
                column: "QueueId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_SlaPolicyId",
                schema: "crm",
                table: "SupportCases",
                column: "SlaPolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_TenantId",
                schema: "crm",
                table: "SupportCases",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_TenantId_CaseNumber",
                schema: "crm",
                table: "SupportCases",
                columns: new[] { "TenantId", "CaseNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupportCases_TenantId_Status_Priority_QueueId_OwnerUserId_UpdatedAtUtc",
                schema: "crm",
                table: "SupportCases",
                columns: new[] { "TenantId", "Status", "Priority", "QueueId", "OwnerUserId", "UpdatedAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_SupportEmailBindings_CaseId",
                schema: "crm",
                table: "SupportEmailBindings",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportEmailBindings_TenantId",
                schema: "crm",
                table: "SupportEmailBindings",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportEmailBindings_TenantId_ExternalThreadKey",
                schema: "crm",
                table: "SupportEmailBindings",
                columns: new[] { "TenantId", "ExternalThreadKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupportQueueMembers_QueueId",
                schema: "crm",
                table: "SupportQueueMembers",
                column: "QueueId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportQueueMembers_TenantId",
                schema: "crm",
                table: "SupportQueueMembers",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportQueueMembers_TenantId_QueueId_UserId",
                schema: "crm",
                table: "SupportQueueMembers",
                columns: new[] { "TenantId", "QueueId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupportQueueMembers_UserId",
                schema: "crm",
                table: "SupportQueueMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportQueues_TenantId",
                schema: "crm",
                table: "SupportQueues",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportQueues_TenantId_Name",
                schema: "crm",
                table: "SupportQueues",
                columns: new[] { "TenantId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupportSlaPolicies_TenantId",
                schema: "crm",
                table: "SupportSlaPolicies",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_SupportSlaPolicies_TenantId_Priority_Severity_IsActive",
                schema: "crm",
                table: "SupportSlaPolicies",
                columns: new[] { "TenantId", "Priority", "Severity", "IsActive" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SupportCaseComments",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "SupportCaseEscalationEvents",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "SupportEmailBindings",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "SupportQueueMembers",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "SupportCases",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "SupportQueues",
                schema: "crm");

            migrationBuilder.DropTable(
                name: "SupportSlaPolicies",
                schema: "crm");
        }
    }
}
