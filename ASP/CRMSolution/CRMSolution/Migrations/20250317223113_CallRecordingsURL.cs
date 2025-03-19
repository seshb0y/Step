using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRMSolution.Migrations
{
    /// <inheritdoc />
    public partial class CallRecordingsURL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CallRecordingUrl",
                table: "Orders");

            migrationBuilder.CreateTable(
                name: "CallRecording",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CallRecording", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CallRecording_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CallRecording_OrderId",
                table: "CallRecording",
                column: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CallRecording");

            migrationBuilder.AddColumn<string>(
                name: "CallRecordingUrl",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
