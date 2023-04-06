import { MigrationInterface, QueryRunner } from "typeorm";

export class MapsMigrations1679575117620 implements MigrationInterface {
    name = 'MapsMigrations1679575117620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "asset" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "cmapId" uuid NOT NULL,
                "image" bytea NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_c4b4b5e96fc0aa4a7d4088bcc18" UNIQUE ("cmapId", "name"),
                CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "c_map" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "data" json NOT NULL,
                "creatorId" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_a491d053698d275e6322a55ab44" UNIQUE ("creatorId", "title"),
                CONSTRAINT "PK_203bc16f0500d808e2ec5b8d611" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "asset"
            ADD CONSTRAINT "FK_2b7cb7afdea37a81e4dd0835e96" FOREIGN KEY ("cmapId") REFERENCES "c_map"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "c_map"
            ADD CONSTRAINT "FK_fb84a792995b81b5ed9098d18f4" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "c_map" DROP CONSTRAINT "FK_fb84a792995b81b5ed9098d18f4"
        `);
        await queryRunner.query(`
            ALTER TABLE "asset" DROP CONSTRAINT "FK_2b7cb7afdea37a81e4dd0835e96"
        `);
        await queryRunner.query(`
            DROP TABLE "c_map"
        `);
        await queryRunner.query(`
            DROP TABLE "asset"
        `);
    }

}
