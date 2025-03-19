using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRMSolution.Migrations
{
    /// <inheritdoc />
    public partial class CallRecordingsURL2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CallRecording_Orders_OrderId",
                table: "CallRecording");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CallRecording",
                table: "CallRecording");

            migrationBuilder.RenameTable(
                name: "CallRecording",
                newName: "CallRecordings");

            migrationBuilder.RenameIndex(
                name: "IX_CallRecording_OrderId",
                table: "CallRecording",
                newName: "IX_CallRecordings_OrderId");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "CallRecording",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CallRecording",
                table: "CallRecording",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CallRecordings_Orders_OrderId",
                table: "CallRecording",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CallRecordings_Orders_OrderId",
                table: "CallRecordings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CallRecordings",
                table: "CallRecordings");

            migrationBuilder.RenameTable(
                name: "CallRecordings",
                newName: "CallRecording");

            migrationBuilder.RenameIndex(
                name: "IX_CallRecordings_OrderId",
                table: "CallRecording",
                newName: "IX_CallRecording_OrderId");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "CallRecording",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CallRecording",
                table: "CallRecording",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CallRecording_Orders_OrderId",
                table: "CallRecording",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
