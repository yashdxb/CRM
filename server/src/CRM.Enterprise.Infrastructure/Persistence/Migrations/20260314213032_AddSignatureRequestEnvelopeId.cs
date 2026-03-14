using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Enterprise.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSignatureRequestEnvelopeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnvelopeId",
                table: "SignatureRequests",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnvelopeId",
                table: "SignatureRequests");
        }
    }
}
