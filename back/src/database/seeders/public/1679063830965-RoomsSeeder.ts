import { MigrationInterface, QueryRunner } from "typeorm"
import { Room } from "../../entities/public/Room"
import { PublicDataSource } from "../../init/datasources/public-data-source"
import defaultRooms from "../../fixtures/rooms"
import defaultGames from "../../fixtures/games"
import defaultPlayers from "../../fixtures/players"
import defaultUsers from "../../fixtures/users"
import { Game } from "../../entities/public/Game"
import { Player } from "../../entities/public/Players"
import { Story } from "../../entities/public/workshop/Story"
import { User } from "../../entities/public/User"
import { Character } from "../../entities/public/characters/Character"
import { CMap } from "../../entities/public/workshop/CMap"

export class RoomsSeeder1679063830965 implements MigrationInterface {
    name = 'RoomsSeeder1679063830965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const RoomsRepository = PublicDataSource.getRepository(Room)
        const GamesRepository = PublicDataSource.getRepository(Game)
        const PlayersRepository = PublicDataSource.getRepository(Player)
        const StoryRepository = PublicDataSource.getRepository(Story)
        const CMapRepository = PublicDataSource.getRepository(CMap)
        const UserRepository = PublicDataSource.getRepository(User)
        const CharacterRepository = PublicDataSource.getRepository(Character)

        const gm = await UserRepository.findOneOrFail({ where: { id: defaultUsers.defaultUser.id } })
        const player = await UserRepository.findOneOrFail({ where: { id: defaultUsers.test.id } })
        const character = await CharacterRepository.findOneOrFail({ where: { user_id: player.id } })

        await GamesRepository.save(defaultGames)
        const game0 = await GamesRepository.findOneOrFail({ where: { id: defaultGames[0].id } })
        const game1 = await GamesRepository.findOneOrFail({ where: { id: defaultGames[1].id } })
        const tilemap = await CMapRepository.findOneOrFail({ where: { creatorId: gm.id } })
        const story = await StoryRepository.findOneOrFail({ where: { creatorId: gm.id } })
        game0.story = story
        game0.tilemap = tilemap
        await GamesRepository.save(game0)

        // await RoomsRepository.save(defaultRooms)
        const room0 = defaultRooms[0] as unknown as Room
        const room1 = defaultRooms[1] as unknown as Room
        room0.game = game0
        room1.game = game1
        room0.gm = gm
        room1.gm = gm
        await RoomsRepository.save(room0)
        await RoomsRepository.save(room1)

        await PlayersRepository.save(defaultPlayers)
        const player0 = await PlayersRepository.findOneOrFail({ where: { id: defaultPlayers[0].id } })
        player0.game = game0
        player0.character = character
        player0.user = player
        await PlayersRepository.save(player0)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const GamesRepository = PublicDataSource.getRepository(Game)

        await GamesRepository.delete({})
    }

}
