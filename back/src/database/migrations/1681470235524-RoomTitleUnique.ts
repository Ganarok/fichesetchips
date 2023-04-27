import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomTitleUnique1681470235524 implements MigrationInterface {
    name = 'RoomTitleUnique1681470235524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room"
            ADD CONSTRAINT "UQ_86075bb2ddc12af74c0f97cc7d6" UNIQUE ("title", "gmId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room" DROP CONSTRAINT "UQ_86075bb2ddc12af74c0f97cc7d6"
        `);
    }

}
