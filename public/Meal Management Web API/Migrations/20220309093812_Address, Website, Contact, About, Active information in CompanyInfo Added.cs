using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class AddressWebsiteContactAboutActiveinformationinCompanyInfoAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_CompanyInfos_CompanyId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyId",
                table: "Users",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "About",
                table: "CompanyInfos",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "CompanyInfos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "CompanyInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Contact",
                table: "CompanyInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "CompanyInfos",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_CompanyInfos_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_CompanyInfos_CompanyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "About",
                table: "CompanyInfos");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "CompanyInfos");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "CompanyInfos");

            migrationBuilder.DropColumn(
                name: "Contact",
                table: "CompanyInfos");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "CompanyInfos");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyId",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_CompanyInfos_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "CompanyInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
