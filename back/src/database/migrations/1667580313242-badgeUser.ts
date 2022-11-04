import { MigrationInterface, QueryRunner } from "typeorm";

export class badgeUser1667580313242 implements MigrationInterface {
    name = 'badgeUser1667580313242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "badge" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "image" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_76b7011c864d4521a14a5196c49" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "badge_user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "badge_id" uuid NOT NULL,
                "percentage_completion" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "badgeId" uuid,
                "userId" uuid,
                CONSTRAINT "PK_53a7612025f79d73941d574b43c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "badge_user"
            ADD CONSTRAINT "FK_35f7ae2927a117d398dab00102f" FOREIGN KEY ("badgeId") REFERENCES "badge"("id") ON DELETE
            SET DEFAULT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "badge_user"
            ADD CONSTRAINT "FK_ce8790edb666fb17e078f20a15f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE
            SET DEFAULT ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "badge_user" DROP CONSTRAINT "FK_ce8790edb666fb17e078f20a15f"
        `);
        await queryRunner.query(`
            ALTER TABLE "badge_user" DROP CONSTRAINT "FK_35f7ae2927a117d398dab00102f"
        `);
        await queryRunner.query(`
            DROP TABLE "badge_user"
        `);
        await queryRunner.query(`
            DROP TABLE "badge"
        `);
    }

}
