import { MigrationInterface, QueryRunner } from "typeorm";

export class StatePlayers1682075077232 implements MigrationInterface {
    name = 'StatePlayers1682075077232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "state" DROP COLUMN "players"
        `);
        await queryRunner.query(`
            ALTER TABLE "state"
            ADD "players" text array NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "state" DROP COLUMN "players"
        `);
        await queryRunner.query(`
            ALTER TABLE "state"
            ADD "players" json array NOT NULL
        `);
    }

}
