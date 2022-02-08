using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class PresentEmployeeTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PresentEmployees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Breakfast = table.Column<bool>(nullable: false),
                    Lunch = table.Column<bool>(nullable: false),
                    Dinner = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PresentEmployees_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyId",
                table: "Users",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PresentEmployees_UserId",
                table: "PresentEmployees",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_CompanyInfos_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_CompanyInfos_CompanyId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "PresentEmployees");

            migrationBuilder.DropIndex(
                name: "IX_Users_CompanyId",
                table: "Users");
        }
    }
}
