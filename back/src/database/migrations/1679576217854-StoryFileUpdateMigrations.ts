import { MigrationInterface, QueryRunner } from "typeorm";

export class StoryFileUpdateMigrations1679576217854 implements MigrationInterface {
    name = 'StoryFileUpdateMigrations1679576217854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "story"
                RENAME COLUMN "path" TO "file"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
                RENAME CONSTRAINT "UQ_fafac59e0528640d30e398b1c0e" TO "UQ_39f6f6d16f4f999e5e5b09a4da0"
        `);
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "UQ_39f6f6d16f4f999e5e5b09a4da0"
        `);
        await queryRunner.query(`
            ALTER TABLE "story" DROP COLUMN "file"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD "file" bytea NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "story" DROP COLUMN "file"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD "file" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD CONSTRAINT "UQ_39f6f6d16f4f999e5e5b09a4da0" UNIQUE ("file")
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
                RENAME CONSTRAINT "UQ_39f6f6d16f4f999e5e5b09a4da0" TO "UQ_fafac59e0528640d30e398b1c0e"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
                RENAME COLUMN "file" TO "path"
        `);
    }

}
