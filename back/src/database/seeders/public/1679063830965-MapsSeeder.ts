import { MigrationInterface, QueryRunner } from "typeorm"
import fs from 'fs'
import { PublicDataSource } from "../../init/datasources/public-data-source"
import { CMap } from "../../entities/public/workshop/CMap"
import { Asset } from "../../entities/public/workshop/Asset"
import defaultMaps from "../../fixtures/maps"

export class MapsSeeder1679063830965 implements MigrationInterface {
    name = 'MapsSeeder1679063830965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const MapRepository = PublicDataSource.getRepository(CMap)
        const map = await MapRepository.save(defaultMaps)

        const AssetRepository = PublicDataSource.getRepository(Asset)
        const image = fs.readFileSync("./src/database/fixtures/assets/desert_grounds.png")
        const asset = {
            cmapId: map[0].id,
            name: "sol",
            image: image
        }
        await AssetRepository.save(asset)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const MapRepository = PublicDataSource.getRepository(CMap)
        const AssetRepository = PublicDataSource.getRepository(Asset)
        await MapRepository.delete({})
        await AssetRepository.delete({})
    }

}
