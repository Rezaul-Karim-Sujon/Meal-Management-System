using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class DbsetofMenuAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menu_FoodItems_FoodItemId",
                table: "Menu");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Menu",
                table: "Menu");

            migrationBuilder.RenameTable(
                name: "Menu",
                newName: "Menus");

            migrationBuilder.RenameIndex(
                name: "IX_Menu_FoodItemId",
                table: "Menus",
                newName: "IX_Menus_FoodItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Menus",
                table: "Menus",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_FoodItems_FoodItemId",
                table: "Menus",
                column: "FoodItemId",
                principalTable: "FoodItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_FoodItems_FoodItemId",
                table: "Menus");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Menus",
                table: "Menus");

            migrationBuilder.RenameTable(
                name: "Menus",
                newName: "Menu");

            migrationBuilder.RenameIndex(
                name: "IX_Menus_FoodItemId",
                table: "Menu",
                newName: "IX_Menu_FoodItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Menu",
                table: "Menu",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Menu_FoodItems_FoodItemId",
                table: "Menu",
                column: "FoodItemId",
                principalTable: "FoodItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
