using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class companyInfoIdcolumnchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "FoodItems");

            migrationBuilder.AddColumn<int>(
                name: "CompanyInfo",
                table: "FoodItems",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyInfo",
                table: "FoodItems");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "FoodItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
