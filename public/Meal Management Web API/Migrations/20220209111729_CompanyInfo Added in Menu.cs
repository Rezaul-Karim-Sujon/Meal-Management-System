using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class CompanyInfoAddedinMenu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyInfoId",
                table: "Menus",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_CompanyInfoId",
                table: "Menus",
                column: "CompanyInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_CompanyInfos_CompanyInfoId",
                table: "Menus",
                column: "CompanyInfoId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_CompanyInfos_CompanyInfoId",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_Menus_CompanyInfoId",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "CompanyInfoId",
                table: "Menus");
        }
    }
}
