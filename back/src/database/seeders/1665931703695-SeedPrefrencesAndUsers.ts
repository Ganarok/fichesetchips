import { getRepository, MigrationInterface, QueryRunner, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Preference } from "../entities/Preference";
import { User } from "../entities/User";
import { Badge } from "../entities/Badge";

import defaultPreferences from "../fixtures/preferences"
import defaultUsers from "../fixtures/users"
import defaultBadge from "../fixtures/badge"

export class SeedPrefrencesAndUsers1665927924682 implements MigrationInterface {
    name = 'SeedPrefrencesAndUsers1665927924682'

    public async up(_: QueryRunner): Promise<any> {
        const UserRepository = AppDataSource.getRepository(User)
        const PreferenceRepository = AppDataSource.getRepository(Preference)
        const BadgeRepository = AppDataSource.getRepository(Badge)

        const defaultPreference = defaultPreferences.defaultPreference as Preference
        const darkPreference = defaultPreferences.darkPreference as Preference

        await PreferenceRepository.save([defaultPreference, darkPreference])

        const user = defaultUsers.defaultUser as User
        const admin = defaultUsers.defaultAdmin as User
        const superAdmin = defaultUsers.defaultSuperAdmin as User
        await UserRepository.save([user, admin, superAdmin])

        const badge = defaultBadge.defaultBadge as Badge
        await BadgeRepository.save([badge])
    }

    public async down(_: QueryRunner): Promise<any> {
        // do nothing
    }
}