using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class FoodNameTabledropped : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FoodItems_FoodNames_FoodNameId",
                table: "FoodItems");

            migrationBuilder.DropTable(
                name: "FoodNames");

            migrationBuilder.DropIndex(
                name: "IX_FoodItems_FoodNameId",
                table: "FoodItems");

            migrationBuilder.DropColumn(
                name: "FoodNameId",
                table: "FoodItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FoodNameId",
                table: "FoodItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FoodNames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodNames", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_FoodNameId",
                table: "FoodItems",
                column: "FoodNameId");

            migrationBuilder.AddForeignKey(
                name: "FK_FoodItems_FoodNames_FoodNameId",
                table: "FoodItems",
                column: "FoodNameId",
                principalTable: "FoodNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
