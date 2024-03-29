import { MigrationInterface, QueryRunner } from "typeorm"
import fs from 'fs'
import { PublicDataSource } from "../../init/datasources/public-data-source"
import { CMap } from "../../entities/public/workshop/CMap"
import { Asset } from "../../entities/public/workshop/Asset"
import defaultMaps from "../../fixtures/maps"

export class MapsSeeder1678969543486 implements MigrationInterface {
    name = 'MapsSeeder1678969543486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const MapRepository = PublicDataSource.getRepository(CMap)
        const map = await MapRepository.save(defaultMaps)

        const AssetRepository = PublicDataSource.getRepository(Asset)
        const image = fs.readFileSync("./src/database/fixtures/assets/desert_grounds.png")
        const assets = [{
            cmapId: map[0].id,
            name: "sol",
            image: image
        }, {
            cmapId: map[1].id,
            name: "sol",
            image: image
        }]
        await AssetRepository.save(assets)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const MapRepository = PublicDataSource.getRepository(CMap)
        const AssetRepository = PublicDataSource.getRepository(Asset)
        await MapRepository.delete({})
        await AssetRepository.delete({})
    }

}
