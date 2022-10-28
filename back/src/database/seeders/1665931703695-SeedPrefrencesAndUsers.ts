import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { Preference } from "../entities/Preference";
import { User } from "../entities/User";

import defaultPreferences from "../fixtures/preferences"
import defaultUsers from "../fixtures/users"

export class SeedPrefrencesAndUsers1665927924682 implements MigrationInterface {
    name = 'SeedPrefrencesAndUsers1665927924682'

    public async up(_: QueryRunner): Promise<any> {
        const UserRepository = AppDataSource.getRepository(User)
        const PreferenceRepository = AppDataSource.getRepository(Preference)

        const defaultPreference = defaultPreferences.defaultPreference as Preference
        const darkPreference = defaultPreferences.darkPreference as Preference

        await PreferenceRepository.save([defaultPreference, darkPreference])

        const user = defaultUsers.defaultUser as User
        const user1 = defaultUsers.defaultUser1 as User
        const user2 = defaultUsers.defaultUser2 as User
        const user3 = defaultUsers.defaultUser3 as User
        const admin = defaultUsers.defaultAdmin as User
        const superAdmin = defaultUsers.defaultSuperAdmin as User
        await UserRepository.save([user, user1, user2, user3, admin, superAdmin])

    }

    public async down(_: QueryRunner): Promise<any> {
        const UserRepository = AppDataSource.getRepository(User)
        const PreferenceRepository = AppDataSource.getRepository(Preference)
        await UserRepository.delete({})
        await PreferenceRepository.delete({})
    }
}
