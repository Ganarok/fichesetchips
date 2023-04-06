import { MigrationInterface, QueryRunner } from "typeorm"
import { PublicDataSource } from "../../init/datasources/public-data-source"
import { Story } from "../../entities/public/workshop/Story"
import users from "../../fixtures/users"
import fs from 'fs'

export class SeedStories1666947914000 implements MigrationInterface {
    name = 'SeedStories1666947914000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const StoryRepository = PublicDataSource.getRepository(Story)
        const file = fs.readFileSync("./src/database/fixtures/assets/Masque-utruz.pdf")
        const defaultStories = [{
            id: "9c9bfccd-7023-4d72-bc14-45d07eb2b855",
            creatorId: users.test.id,
            title: "A Good Story",
            file: file
        }]
        await StoryRepository.save(defaultStories)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const StoryRepository = PublicDataSource.getRepository(Story)
        await StoryRepository.delete({})
    }

}
