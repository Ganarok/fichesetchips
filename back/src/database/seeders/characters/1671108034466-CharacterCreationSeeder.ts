import { MigrationInterface, QueryRunner } from "typeorm"
import { PublicDataSource } from "../../init/datasources/public-data-source"
import fixtures from "../../fixtures/character_creation"

export class CharacterCreationSeeder1671108034466 implements MigrationInterface {
    name = 'CharacterCreationSeeder1671108034466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await PublicDataSource.createQueryBuilder().insert().into("calculation").values(fixtures.calculations).execute()
        await PublicDataSource.createQueryBuilder().insert().into("characteristic_modificator").values(fixtures.caracteristics_modificators).execute()
        await PublicDataSource.createQueryBuilder().insert().into("characteristic").values(fixtures.caracteristics).execute()
        await PublicDataSource.createQueryBuilder().insert().into("skill").values(fixtures.skills).execute()
        await PublicDataSource.createQueryBuilder().insert().into("language").values(fixtures.languages).execute()
        await PublicDataSource.createQueryBuilder().insert().into("profile").values(fixtures.profils).execute()
        await PublicDataSource.createQueryBuilder().insert().into("class").values(fixtures.classes).execute()
        await PublicDataSource.createQueryBuilder().insert().into("class_skill").values(fixtures.classes_skills).execute()
        await PublicDataSource.createQueryBuilder().insert().into("saving_thrown").values(fixtures.saving_throws).execute()
        await PublicDataSource.createQueryBuilder().insert().into("race").values(fixtures.races).execute()
        await PublicDataSource.createQueryBuilder().insert().into("race_characteristic").values(fixtures.races_caracteristics).execute()
        await PublicDataSource.createQueryBuilder().insert().into("item").values(fixtures.items).execute()
        await PublicDataSource.createQueryBuilder().insert().into("item_stat").values(fixtures.itemStats).execute()
        await PublicDataSource.createQueryBuilder().insert().into("profile_weapon").values(fixtures.profil_weapons).execute()
        await PublicDataSource.createQueryBuilder().insert().into("race_language").values(fixtures.races_languages).execute()
        await PublicDataSource.createQueryBuilder().insert().into("level").values(fixtures.levels).execute()
        await PublicDataSource.createQueryBuilder().insert().into("character").values(fixtures.characters).execute()
        await PublicDataSource.createQueryBuilder().insert().into("character_language").values(fixtures.characters_languages).execute()
        await PublicDataSource.createQueryBuilder().insert().into("money").values(fixtures.money).execute()
        await PublicDataSource.createQueryBuilder().insert().into("character_characteristic").values(fixtures.characters_caracteristics).execute()
        await PublicDataSource.createQueryBuilder().insert().into("equipment").values(fixtures.equipment).execute()
        await PublicDataSource.createQueryBuilder().insert().into("character_skill").values(fixtures.character_skill).execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
