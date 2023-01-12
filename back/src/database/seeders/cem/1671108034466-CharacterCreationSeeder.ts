import { MigrationInterface, QueryRunner } from "typeorm"
import { CEMDataSource } from "../../init/datasources/cem-data-source"
import fixtures from "../../fixtures/character_creation"

export class CharacterCreationSeeder1671108034466 implements MigrationInterface {
    name = 'CharacterCreationSeeder1671108034466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await CEMDataSource.createQueryBuilder().insert().into("cem.calculation").values(fixtures.calculations).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.characteristic_modificator").values(fixtures.caracteristics_modificators).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.characteristic").values(fixtures.caracteristics).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.skill").values(fixtures.skills).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.language").values(fixtures.languages).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.profile").values(fixtures.profils).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.class").values(fixtures.classes).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.class_skill").values(fixtures.classes_skills).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.saving_thrown").values(fixtures.saving_throws).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.race").values(fixtures.races).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.race_characteristic").values(fixtures.races_caracteristics).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.item").values(fixtures.items).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.item_stat").values(fixtures.itemStats).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.profile_weapon").values(fixtures.profil_weapons).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.race_language").values(fixtures.races_languages).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.level").values(fixtures.levels).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.character").values(fixtures.characters).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.character_language").values(fixtures.characters_languages).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.money").values(fixtures.money).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.character_characteristic").values(fixtures.characters_caracteristics).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.equipment").values(fixtures.equipment).execute()
        await CEMDataSource.createQueryBuilder().insert().into("cem.character_skill").values(fixtures.character_skill).execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
