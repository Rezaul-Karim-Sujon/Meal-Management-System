using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class FoodItemPropertychanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodItems_CompanyInfos_CompanyInfoId",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "FoodCategoryId",
                table: "FoodItems");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyInfoId",
                table: "FoodItems",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodItems_CompanyInfos_CompanyInfoId",
                table: "FoodItems",
                column: "CompanyInfoId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodItems_CompanyInfos_CompanyInfoId",
                table: "FoodItems");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyInfoId",
                table: "FoodItems",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FoodCategoryId",
                table: "FoodItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_FoodItems_CompanyInfos_CompanyInfoId",
                table: "FoodItems",
                column: "CompanyInfoId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
