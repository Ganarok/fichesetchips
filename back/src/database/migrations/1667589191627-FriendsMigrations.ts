import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendsMigrations1667589191627 implements MigrationInterface {
    name = 'FriendsMigrations1667589191627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "friend" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_asked_id" uuid NOT NULL,
                "user_answered_id" uuid NOT NULL,
                "accepted" boolean NOT NULL DEFAULT false,
                "nb_games" integer NOT NULL DEFAULT '0',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_a57a96f089df232ab6f5891c144" UNIQUE ("user_asked_id", "user_answered_id"),
                CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "friend"
            ADD CONSTRAINT "FK_72fc6a507f06959eec39810b69f" FOREIGN KEY ("user_asked_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "friend"
            ADD CONSTRAINT "FK_c0365ea72fa6809b953670dff40" FOREIGN KEY ("user_answered_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "friend" DROP CONSTRAINT "FK_c0365ea72fa6809b953670dff40"
        `);
        await queryRunner.query(`
            ALTER TABLE "friend" DROP CONSTRAINT "FK_72fc6a507f06959eec39810b69f"
        `);
        await queryRunner.query(`
            DROP TABLE "friend"
        `);
    }

}
