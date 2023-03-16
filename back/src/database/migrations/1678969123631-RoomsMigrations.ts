import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomsMigrations1678969123631 implements MigrationInterface {
    name = 'RoomsMigrations1678969123631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "player" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "state_id" character varying NOT NULL DEFAULT 'not implemented',
                "userId" uuid,
                "characterId" uuid,
                "gameId" uuid,
                CONSTRAINT "REL_07d489022a5f8ed3d8e9f59506" UNIQUE ("characterId"),
                CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."game_status_enum" AS ENUM('planned', 'running', 'paused', 'closed')
        `);
        await queryRunner.query(`
            CREATE TABLE "game" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "status" "public"."game_status_enum" NOT NULL DEFAULT 'planned',
                "map" character varying NOT NULL DEFAULT 'not implemented',
                "universe" character varying NOT NULL DEFAULT 'not implemented',
                "storyId" uuid,
                CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "room" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "decription" text NOT NULL,
                "requirements" text NOT NULL,
                "vocal_url" character varying NOT NULL,
                "is_private" boolean NOT NULL DEFAULT false,
                "is_published" boolean NOT NULL DEFAULT false,
                "password" character varying,
                "players_nb_max" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "gmId" uuid,
                "gameId" uuid,
                CONSTRAINT "REL_b6670c42fb2ea4ff502015b0ef" UNIQUE ("gameId"),
                CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
            ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
            ADD CONSTRAINT "FK_07d489022a5f8ed3d8e9f59506c" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
            ADD CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_60aa4ec0e63a8e0de9e45cc3f00" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "room"
            ADD CONSTRAINT "FK_a800d9fa03591fc41cdd22360c5" FOREIGN KEY ("gmId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE "room" DROP CONSTRAINT "FK_a800d9fa03591fc41cdd22360c5"
        `);
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_60aa4ec0e63a8e0de9e45cc3f00"
        `);
        await queryRunner.query(`
            ALTER TABLE "player" DROP CONSTRAINT "FK_7dfdd31fcd2b5aa3b08ed15fe8a"
        `);
        await queryRunner.query(`
            ALTER TABLE "player" DROP CONSTRAINT "FK_07d489022a5f8ed3d8e9f59506c"
        `);
        await queryRunner.query(`
            ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"
        `);
        await queryRunner.query(`
            DROP TABLE "room"
        `);
        await queryRunner.query(`
            DROP TABLE "game"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."game_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "player"
        `);
    }

}
