import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomsUpdateMigrations1678969787661 implements MigrationInterface {
    name = 'RoomsUpdateMigrations1678969787661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room"
                RENAME COLUMN "decription" TO "description"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room"
                RENAME COLUMN "description" TO "decription"
        `);
    }

}
