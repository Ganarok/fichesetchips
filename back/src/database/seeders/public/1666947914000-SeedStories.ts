import { MigrationInterface, QueryRunner } from "typeorm"
import { PublicDataSource } from "../../init/datasources/public-data-source"
import defaultStories from "../../fixtures/stories"
import { Story } from "../../entities/public/workshop/Story"

export class SeedStories1666947914000 implements MigrationInterface {
    name = 'SeedStories1666947914000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const StoryRepository = PublicDataSource.getRepository(Story)

        await StoryRepository.save(defaultStories)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const StoryRepository = PublicDataSource.getRepository(Story)
        await StoryRepository.delete({})
    }

}
