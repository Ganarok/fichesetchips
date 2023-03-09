import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCHaractersEnumMigrations1678355221963 implements MigrationInterface {
    name = 'RemoveCHaractersEnumMigrations1678355221963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP COLUMN "sex"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."character_sex_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD "sex" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP COLUMN "alignment"
        `);
        await queryRunner.query(`
            DROP TYPE "cem"."character_alignment_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD "alignment" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP COLUMN "alignment"
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."character_alignment_enum" AS ENUM(
                'LAWFUL GOOD',
                'LAWFUL NEUTRAL',
                'LAWFUL EVIL',
                'NEUTRAL GOOD',
                'NEUTRAL',
                'NEUTRAL EVIL',
                'CHAOTIC GOOD',
                'CHAOTIC NEUTRAL',
                'CHAOTIC EVIL'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD "alignment" "cem"."character_alignment_enum" NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character" DROP COLUMN "sex"
        `);
        await queryRunner.query(`
            CREATE TYPE "cem"."character_sex_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')
        `);
        await queryRunner.query(`
            ALTER TABLE "cem"."character"
            ADD "sex" "cem"."character_sex_enum" NOT NULL
        `);
    }

}
