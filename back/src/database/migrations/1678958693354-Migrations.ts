import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1678958693354 implements MigrationInterface {
    name = 'Migrations1678958693354'

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
            CREATE TABLE "story" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "title" character varying NOT NULL,
                "path" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_fafac59e0528640d30e398b1c0e" UNIQUE ("path"),
                CONSTRAINT "UQ_2ebeda9faf00b7e85fe87944f0a" UNIQUE ("user_id", "title"),
                CONSTRAINT "PK_28fce6873d61e2cace70a0f3361" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_0532217bd629d0ccf06499c5841" FOREIGN KEY ("preference_id") REFERENCES "preference"("id") ON DELETE
            SET DEFAULT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "friend"
            ADD CONSTRAINT "FK_72fc6a507f06959eec39810b69f" FOREIGN KEY ("user_asked_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "friend"
            ADD CONSTRAINT "FK_c0365ea72fa6809b953670dff40" FOREIGN KEY ("user_answered_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD CONSTRAINT "FK_cac14a7871997a849f8fc2dd20c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "FK_cac14a7871997a849f8fc2dd20c"
        `);
        await queryRunner.query(`
            ALTER TABLE "friend" DROP CONSTRAINT "FK_c0365ea72fa6809b953670dff40"
        `);
        await queryRunner.query(`
            ALTER TABLE "friend" DROP CONSTRAINT "FK_72fc6a507f06959eec39810b69f"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_0532217bd629d0ccf06499c5841"
        `);
        await queryRunner.query(`
            DROP TABLE "story"
        `);
        await queryRunner.query(`
            DROP TABLE "friend"
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
    }

}
