using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class MenuTableconstruction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Menu_MenuId",
                table: "Meals");

            migrationBuilder.DropForeignKey(
                name: "FK_Menu_FoodItems_FoodItemId",
                table: "Menu");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Menu",
                table: "Menu");

            migrationBuilder.DropIndex(
                name: "IX_Menu_FoodItemId",
                table: "Menu");

            migrationBuilder.DropColumn(
                name: "FixedItem",
                table: "Menu");

            migrationBuilder.DropColumn(
                name: "FoodItemId",
                table: "Menu");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Menu");

            migrationBuilder.DropColumn(
                name: "IsDefault",
                table: "Menu");

            migrationBuilder.DropColumn(
                name: "MenuId",
                table: "Menu");

            migrationBuilder.RenameTable(
                name: "Menu",
                newName: "Menus");

            migrationBuilder.AddColumn<int>(
                name: "MenuId",
                table: "MenuItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CT",
                table: "Menus",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Menus",
                table: "Menus",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_MenuId",
                table: "MenuItems",
                column: "MenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Menus_MenuId",
                table: "Meals",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_Menus_MenuId",
                table: "MenuItems",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Menus_MenuId",
                table: "Meals");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_Menus_MenuId",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuItems_MenuId",
                table: "MenuItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Menus",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "MenuId",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "CT",
                table: "Menus");

            migrationBuilder.RenameTable(
                name: "Menus",
                newName: "Menu");

            migrationBuilder.AddColumn<bool>(
                name: "FixedItem",
                table: "Menu",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "FoodItemId",
                table: "Menu",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Menu",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDefault",
                table: "Menu",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MenuId",
                table: "Menu",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Menu",
                table: "Menu",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Menu_FoodItemId",
                table: "Menu",
                column: "FoodItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Menu_MenuId",
                table: "Meals",
                column: "MenuId",
                principalTable: "Menu",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
