using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSUC.Registration.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "registrants",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    full_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    sex = table.Column<int>(type: "integer", nullable: false),
                    email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    phone_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    location_state = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    expectations = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    needs_accommodation = table.Column<bool>(type: "boolean", nullable: false),
                    means_of_transportation = table.Column<int>(type: "integer", nullable: false),
                    coming_with = table.Column<int>(type: "integer", nullable: false),
                    number_of_persons = table.Column<int>(type: "integer", nullable: false),
                    registered_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_registrants", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_registrants_email",
                table: "registrants",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_registrants_full_name",
                table: "registrants",
                column: "full_name");

            migrationBuilder.CreateIndex(
                name: "ix_registrants_registered_at",
                table: "registrants",
                column: "registered_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "registrants");
        }
    }
}
