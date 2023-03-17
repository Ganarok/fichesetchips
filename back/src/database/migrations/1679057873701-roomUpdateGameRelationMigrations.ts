import { MigrationInterface, QueryRunner } from "typeorm";

export class roomUpdateGameRelationMigrations1679057873701 implements MigrationInterface {
    name = 'roomUpdateGameRelationMigrations1679057873701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room" DROP CONSTRAINT "FK_a800d9fa03591fc41cdd22360c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ALTER COLUMN "gmId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ADD CONSTRAINT "FK_a800d9fa03591fc41cdd22360c5" FOREIGN KEY ("gmId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room" DROP CONSTRAINT "FK_a800d9fa03591fc41cdd22360c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ALTER COLUMN "gmId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ADD CONSTRAINT "FK_a800d9fa03591fc41cdd22360c5" FOREIGN KEY ("gmId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
