using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class NotmappedtoFoodItemsnavigationproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodItems_FoodCategories_FoodCategoryId",
                table: "FoodItems");

            migrationBuilder.DropIndex(
                name: "IX_FoodItems_FoodCategoryId",
                table: "FoodItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_FoodCategoryId",
                table: "FoodItems",
                column: "FoodCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodItems_FoodCategories_FoodCategoryId",
                table: "FoodItems",
                column: "FoodCategoryId",
                principalTable: "FoodCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
