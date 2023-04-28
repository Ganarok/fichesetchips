import { MigrationInterface, QueryRunner } from "typeorm";

export class StateGame1682064925434 implements MigrationInterface {
    name = 'StateGame1682064925434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "state" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "map" json NOT NULL,
                "players" json array NOT NULL,
                CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "player" DROP COLUMN "state"
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD "stateId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "UQ_ee4ee4788bef0d086d8d6347e5f" UNIQUE ("stateId")
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "UQ_f6a2476984fb667885db992a1d6" UNIQUE ("id", "stateId")
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "UQ_f6a2476984fb667885db992a1d6"
        `);
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "UQ_ee4ee4788bef0d086d8d6347e5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "stateId"
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
            ADD "state" character varying NOT NULL DEFAULT 'not implemented'
        `);
        await queryRunner.query(`
            DROP TABLE "state"
        `);
    }

}
