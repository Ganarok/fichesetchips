import { MigrationInterface, QueryRunner } from "typeorm"
import { Room } from "../../entities/public/Room"
import { PublicDataSource } from "../../init/datasources/public-data-source"
import defaultRooms from "../../fixtures/rooms"
import defaultGames from "../../fixtures/games"
import defaultPlayers from "../../fixtures/players"
import { Game } from "../../entities/public/Game"
import { Player } from "../../entities/public/Players"

export class RoomsSeeder1678969543486 implements MigrationInterface {
    name = 'RoomsSeeder1678969543486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const RoomsRepository = PublicDataSource.getRepository(Room)
        const GamesRepository = PublicDataSource.getRepository(Game)
        const PlayersRepository = PublicDataSource.getRepository(Player)

        await GamesRepository.save(defaultGames)
        await RoomsRepository.save(defaultRooms)
        await PlayersRepository.save(defaultPlayers)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const GamesRepository = PublicDataSource.getRepository(Game)

        await GamesRepository.delete({})
    }

}
