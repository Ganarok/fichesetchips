import { MigrationInterface, QueryRunner } from "typeorm"
import { PublicDataSource } from "../../init/datasources/public-data-source"
import { Friend } from "../../entities/public/Friend"
import defaultFriends from "../../fixtures/friends"

export class SeedFriend1666947913970 implements MigrationInterface {
    name = 'SeedFriend1666947913970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const FriendRepository = PublicDataSource.getRepository(Friend)

        await FriendRepository.save(defaultFriends)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const FriendRepository = PublicDataSource.getRepository(Friend)
        await FriendRepository.delete({})
    }

}
