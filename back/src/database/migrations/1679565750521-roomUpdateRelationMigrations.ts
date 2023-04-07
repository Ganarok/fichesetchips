import { MigrationInterface, QueryRunner } from "typeorm";

export class roomUpdateRelationMigrations1679565750521 implements MigrationInterface {
    name = 'roomUpdateRelationMigrations1679565750521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "player"
                RENAME COLUMN "state_id" TO "state"
        `);
        await queryRunner.query(`
            ALTER TABLE "room" DROP CONSTRAINT "FK_b6670c42fb2ea4ff502015b0efe"
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ALTER COLUMN "gameId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ADD CONSTRAINT "FK_b6670c42fb2ea4ff502015b0efe" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "room" DROP CONSTRAINT "FK_b6670c42fb2ea4ff502015b0efe"
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ALTER COLUMN "gameId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ADD CONSTRAINT "FK_b6670c42fb2ea4ff502015b0efe" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
                RENAME COLUMN "state" TO "state_id"
        `);
    }

}
