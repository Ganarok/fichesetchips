import { MigrationInterface, QueryRunner } from "typeorm"

export class UserCharacterMigrations1671721266646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD CONSTRAINT "FK_user_character" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE
            CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP CONSTRAINT "FK_user_character"
        `);
    }

}
