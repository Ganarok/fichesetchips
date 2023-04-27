import { MigrationInterface, QueryRunner } from "typeorm";

export class GameTrigger1682083439707 implements MigrationInterface {
    name = 'GameTrigger1682083439707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game"
            ALTER COLUMN "universe"
            SET DEFAULT 'cem'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game"
            ALTER COLUMN "universe"
            SET DEFAULT 'not implemented'
        `);
    }

}
