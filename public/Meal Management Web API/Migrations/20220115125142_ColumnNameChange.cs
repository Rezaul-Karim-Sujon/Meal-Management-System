using Microsoft.EntityFrameworkCore.Migrations;

namespace Meal_Management_Web_API.Migrations
{
    public partial class ColumnNameChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_CompanyInfos_companyIdid",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_companyIdid",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "companyIdid",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "userType",
                table: "Users",
                newName: "UserType");

            migrationBuilder.RenameColumn(
                name: "picturePath",
                table: "Users",
                newName: "PicturePath");

            migrationBuilder.RenameColumn(
                name: "phone",
                table: "Users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "Users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "active",
                table: "Users",
                newName: "Active");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "CompanyInfos",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "logoPath",
                table: "CompanyInfos",
                newName: "LogoPath");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "CompanyInfos",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyId",
                table: "Users",
                column: "CompanyId");

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

            migrationBuilder.DropIndex(
                name: "IX_Users_CompanyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "UserType",
                table: "Users",
                newName: "userType");

            migrationBuilder.RenameColumn(
                name: "PicturePath",
                table: "Users",
                newName: "picturePath");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Users",
                newName: "phone");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Active",
                table: "Users",
                newName: "active");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "CompanyInfos",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "LogoPath",
                table: "CompanyInfos",
                newName: "logoPath");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "CompanyInfos",
                newName: "id");

            migrationBuilder.AddColumn<int>(
                name: "companyIdid",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_companyIdid",
                table: "Users",
                column: "companyIdid");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_CompanyInfos_companyIdid",
                table: "Users",
                column: "companyIdid",
                principalTable: "CompanyInfos",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
