import { MigrationInterface, QueryRunner } from "typeorm";

export class PreferencesUsersMigrations1665931703694 implements MigrationInterface {
    name = 'PreferencesUsersMigrations1665931703694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."preference_theme_enum" AS ENUM('DEFAULT', 'DARK')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."preference_language_enum" AS ENUM('FRENCH', 'ENGLISH')
        `);
        await queryRunner.query(`
            CREATE TABLE "preference" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "theme" "public"."preference_theme_enum" NOT NULL DEFAULT 'DEFAULT',
                "language" "public"."preference_language_enum" NOT NULL DEFAULT 'FRENCH',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_2718b1256b91be1716010047163" UNIQUE ("theme", "language"),
                CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'ADMIN', 'SUPERADMIN')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "avatar" character varying NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png',
                "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER',
                "preference_id" uuid NOT NULL DEFAULT '3a9975f8-f34c-4a07-bbff-ab8a9b2e6309',
                "last_connection" TIMESTAMP NOT NULL DEFAULT now(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "badge" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "image" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_3a9975f8f34c4a07bbffab8a9b2e6309" UNIQUE ("name"),
                CONSTRAINT "PK_3a9975f8f34c4a07bbffab8a9b2e6309" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_0532217bd629d0ccf06499c5841" FOREIGN KEY ("preference_id") REFERENCES "preference"("id") ON DELETE
            SET DEFAULT ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_0532217bd629d0ccf06499c5841"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "preference"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."preference_language_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."preference_theme_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "badge"
        `);
    }

}
