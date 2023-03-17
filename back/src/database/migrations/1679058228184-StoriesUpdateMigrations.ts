import { MigrationInterface, QueryRunner } from "typeorm";

export class StoriesUpdateMigrations1679058228184 implements MigrationInterface {
    name = 'StoriesUpdateMigrations1679058228184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "FK_cac14a7871997a849f8fc2dd20c"
        `);
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "UQ_2ebeda9faf00b7e85fe87944f0a"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
                RENAME COLUMN "user_id" TO "creatorId"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD CONSTRAINT "UQ_4271863022bce4a6e7209233cad" UNIQUE ("creatorId", "title")
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD CONSTRAINT "FK_59db3731bb1da73f87200450623" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "FK_59db3731bb1da73f87200450623"
        `);
        await queryRunner.query(`
            ALTER TABLE "story" DROP CONSTRAINT "UQ_4271863022bce4a6e7209233cad"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
                RENAME COLUMN "creatorId" TO "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD CONSTRAINT "UQ_2ebeda9faf00b7e85fe87944f0a" UNIQUE ("user_id", "title")
        `);
        await queryRunner.query(`
            ALTER TABLE "story"
            ADD CONSTRAINT "FK_cac14a7871997a849f8fc2dd20c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
