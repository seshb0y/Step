using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRMSolution.Migrations
{
    /// <inheritdoc />
    public partial class Twilio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CallRecordingUrl",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CallRecordingUrl",
                table: "Orders");
        }
    }
}
