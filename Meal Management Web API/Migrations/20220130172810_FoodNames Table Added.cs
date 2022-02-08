using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class FoodNamesTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PresentEmployee");

            migrationBuilder.CreateTable(
                name: "FoodNames",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodNames", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodNames");

            migrationBuilder.CreateTable(
                name: "PresentEmployee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Breakfast = table.Column<bool>(type: "bit", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Dinner = table.Column<bool>(type: "bit", nullable: false),
                    Lunch = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentEmployee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PresentEmployee_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PresentEmployee_UserId",
                table: "PresentEmployee",
                column: "UserId",
                unique: true);
        }
    }
}
