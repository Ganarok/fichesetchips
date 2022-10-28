import { MigrationInterface, QueryRunner } from "typeorm"
import { AppDataSource } from "../data-source"
import { Friend } from "../entities/Friend"
import defaultFriends from "../fixtures/friends"

export class SeedFriend1666947913970 implements MigrationInterface {
    name = 'SeedFriend1666947913970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const FriendRepository = AppDataSource.getRepository(Friend)

        await FriendRepository.save(defaultFriends)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const FriendRepository = AppDataSource.getRepository(Friend)
        await FriendRepository.delete({})
    }

}
