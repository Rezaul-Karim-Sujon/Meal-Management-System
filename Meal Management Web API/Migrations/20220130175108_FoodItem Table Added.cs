using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class FoodItemTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FoodItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FoodCategoryId = table.Column<int>(nullable: false),
                    FoodNameId = table.Column<int>(nullable: false),
                    RecipeName = table.Column<string>(nullable: true),
                    Picture = table.Column<string>(nullable: true),
                    CompanyId = table.Column<int>(nullable: false),
                    CompanyInfoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FoodItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FoodItems_CompanyInfos_CompanyInfoId",
                        column: x => x.CompanyInfoId,
                        principalTable: "CompanyInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FoodItems_FoodCategories_FoodCategoryId",
                        column: x => x.FoodCategoryId,
                        principalTable: "FoodCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FoodItems_FoodNames_FoodNameId",
                        column: x => x.FoodNameId,
                        principalTable: "FoodNames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_CompanyInfoId",
                table: "FoodItems",
                column: "CompanyInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_FoodCategoryId",
                table: "FoodItems",
                column: "FoodCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_FoodItems_FoodNameId",
                table: "FoodItems",
                column: "FoodNameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FoodItems");
        }
    }
}
