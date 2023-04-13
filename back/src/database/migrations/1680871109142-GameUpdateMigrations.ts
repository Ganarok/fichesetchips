import { MigrationInterface, QueryRunner } from "typeorm";

export class GameUpdateMigrations1680871109142 implements MigrationInterface {
    name = 'GameUpdateMigrations1680871109142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "asset" DROP CONSTRAINT "FK_2b7cb7afdea37a81e4dd0835e96"
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
                RENAME COLUMN "map" TO "tilemapId"
        `);
        await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "tilemapId"
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD "tilemapId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_7ec83b8539d2520c575616bcd70" FOREIGN KEY ("tilemapId") REFERENCES "c_map"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_7ec83b8539d2520c575616bcd70"
        `);
        await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "tilemapId"
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD "tilemapId" character varying NOT NULL DEFAULT 'not implemented'
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
                RENAME COLUMN "tilemapId" TO "map"
        `);
        await queryRunner.query(`
            ALTER TABLE "asset"
            ADD CONSTRAINT "FK_2b7cb7afdea37a81e4dd0835e96" FOREIGN KEY ("cmapId") REFERENCES "c_map"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
