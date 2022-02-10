using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class CompanyIdaddedinMealtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyInfoId",
                table: "Meals",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Meals_CompanyInfoId",
                table: "Meals",
                column: "CompanyInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_CompanyInfos_CompanyInfoId",
                table: "Meals",
                column: "CompanyInfoId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_CompanyInfos_CompanyInfoId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_CompanyInfoId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "CompanyInfoId",
                table: "Meals");
        }
    }
}
