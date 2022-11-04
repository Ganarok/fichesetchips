import { MigrationInterface, QueryRunner } from "typeorm"
import { Badge } from "../entities/Badge";
import { BadgeUser } from "../entities/BadgeUser";
import defaultBadge from "../fixtures/badge"
import { AppDataSource } from "../data-source";
export class BadgeSeeder1667580432033 implements MigrationInterface {
    name = 'BadgeSeeder1667580432033'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const BadgeRepository = AppDataSource.getRepository(Badge)
        const BadgeUserRepository = AppDataSource.getRepository(BadgeUser)

        const badge = defaultBadge.defaultBadge as Badge
        console.log(badge)
        await BadgeRepository.save([badge])
        const badgeUser = defaultBadge.defaultBadgeUser
        console.log(badgeUser)
        await BadgeUserRepository.save([badgeUser])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
