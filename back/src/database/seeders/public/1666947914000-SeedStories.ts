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
            id: "cfe1a32b-9535-4808-82df-4b00b5fdaf02",
            creatorId: users.test.id,
            title: "Le roi Karadoc",
            file: file
        }, {
            id: "7a407da3-e138-46c8-a2df-ea77a8a26498",
            creatorId: users.defaultUser.id,
            title: "Le mage noir",
            file: file
        }, {
            id: "33a60a76-e0be-4895-838b-5fd78d3001c2",
            creatorId: users.defaultUser1.id,
            title: "Le mage Blanc",
            file: file
        }]
        await StoryRepository.save(defaultStories)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const StoryRepository = PublicDataSource.getRepository(Story)
        await StoryRepository.delete({})
    }

}
