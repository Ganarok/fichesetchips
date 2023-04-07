import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerUpdateGameIdUniqueMigrations1679586140312 implements MigrationInterface {
    name = 'PlayerUpdateGameIdUniqueMigrations1679586140312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "player"
            ADD CONSTRAINT "UQ_1226352721f49996c9bf0bbe9d2" UNIQUE ("userId", "gameId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "player" DROP CONSTRAINT "UQ_1226352721f49996c9bf0bbe9d2"
        `);
    }

}
