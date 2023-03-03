import { MigrationInterface, QueryRunner } from "typeorm";

export class StoriesMigrations1677851045430 implements MigrationInterface {
    name = 'StoriesMigrations1677851045430'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
            ALTER TABLE "story"
            ADD CONSTRAINT "FK_cac14a7871997a849f8fc2dd20c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "FK_cac14a7871997a849f8fc2dd20c"
        `);
        await queryRunner.query(`
            DROP TABLE "story"
        `);
    }

}
