using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControllerFirst.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "userRoleId_temp",
                table: "UserRoles",
                type: "uniqueidentifier", // Новый тип данных
                nullable: false);
            
            migrationBuilder.DropPrimaryKey(
                name: "PK__UserRole__CD3149CCDE4D7241",
                table: "UserRoles");

            // Удаляем старый столбец с IDENTITY
            migrationBuilder.DropColumn(name: "userRoleId", table: "UserRoles");

            // Переименовываем новый столбец обратно
            migrationBuilder.RenameColumn(
                name: "userRoleId_temp",
                table: "UserRoles",
                newName: "userRoleId");

            // Восстанавливаем первичный ключ (если нужно)
            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles",
                column: "userRoleId");

        }
        
        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
        }
    }
}
