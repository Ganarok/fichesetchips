import { MigrationInterface, QueryRunner } from "typeorm";

export class StateOnDeleteSetNull1682596698833 implements MigrationInterface {
    name = 'StateOnDeleteSetNull1682596698833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_ee4ee4788bef0d086d8d6347e5f" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
