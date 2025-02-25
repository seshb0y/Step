using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRMSolution.Migrations
{
    /// <inheritdoc />
    public partial class second : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "Tasks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_OrderId",
                table: "Tasks",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Orders_OrderId",
                table: "Tasks",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Orders_OrderId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_OrderId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Tasks");
        }
    }
}
