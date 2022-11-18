import { MigrationInterface, QueryRunner } from "typeorm";

export class reports1666875566872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "reports" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "reported" uuid NOT NULL,
            "by" uuid NOT NULL',
            "reason" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6" PRIMARY KEY ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "reports"
    `);
  }
}
