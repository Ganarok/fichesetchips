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

        const defaultUser = await UserRepository.findOneOrFail({ where: { id: defaultUsers.defaultUser.id } })
        const defaultUser1 = await UserRepository.findOneOrFail({ where: { id: defaultUsers.defaultUser1.id } })
        const defaultUser2 = await UserRepository.findOneOrFail({ where: { id: defaultUsers.defaultUser2.id } })
        const test = await UserRepository.findOneOrFail({ where: { id: defaultUsers.test.id } })
        const characterTest = await CharacterRepository.findOneOrFail({ where: { user_id: test.id } })
        const characterUser = await CharacterRepository.findOneOrFail({ where: { user_id: defaultUser.id } })
        const characterUser1 = await CharacterRepository.findOneOrFail({ where: { user_id: defaultUser1.id } })
        const characterUser2 = await CharacterRepository.findOneOrFail({ where: { user_id: defaultUser2.id } })

        await GamesRepository.save(defaultGames)
        const gameUserIsGM = await GamesRepository.findOneOrFail({ where: { id: defaultGames[0].id } })
        const gameTestIsGM = await GamesRepository.findOneOrFail({ where: { id: defaultGames[1].id } })
        const tilemapUser = await CMapRepository.findOneOrFail({ where: { creatorId: defaultUser.id } })
        const tilemapTest = await CMapRepository.findOneOrFail({ where: { creatorId: test.id } })
        const storyUser = await StoryRepository.findOneOrFail({ where: { creatorId: defaultUser.id } })
        const storyTest = await StoryRepository.findOneOrFail({ where: { creatorId: test.id } })
        gameUserIsGM.story = storyUser
        gameTestIsGM.story = storyTest
        gameUserIsGM.tilemap = tilemapUser
        gameTestIsGM.tilemap = tilemapTest
        await GamesRepository.save(gameUserIsGM)
        await GamesRepository.save(gameTestIsGM)

        // await RoomsRepository.save(defaultRooms)
        const roomUserIsGM = defaultRooms[0] as unknown as Room
        const roomTestIsGM = defaultRooms[1] as unknown as Room
        roomUserIsGM.game = gameUserIsGM
        roomTestIsGM.game = gameTestIsGM
        roomUserIsGM.gm = defaultUser
        roomTestIsGM.gm = test
        await RoomsRepository.save(roomUserIsGM)
        await RoomsRepository.save(roomTestIsGM)

        await PlayersRepository.save(defaultPlayers)
        const playerUser = await PlayersRepository.findOneOrFail({ where: { id: defaultPlayers[0].id } })
        const playerTest = await PlayersRepository.findOneOrFail({ where: { id: defaultPlayers[1].id } })
        const playerUser1 = await PlayersRepository.findOneOrFail({ where: { id: defaultPlayers[2].id } })
        const playerUser2 = await PlayersRepository.findOneOrFail({ where: { id: defaultPlayers[3].id } })
        playerTest.game = gameUserIsGM
        playerUser.game = gameTestIsGM
        playerUser1.game = gameTestIsGM
        playerUser2.game = gameTestIsGM
        playerTest.character = characterTest
        playerUser.character = characterUser
        playerUser1.character = characterUser1
        playerUser2.character = characterUser2
        playerTest.user = test
        playerUser.user = defaultUser
        playerUser1.user = defaultUser1
        playerUser2.user = defaultUser2
        await PlayersRepository.save(playerUser)
        await PlayersRepository.save(playerUser1)
        await PlayersRepository.save(playerUser2)
        await PlayersRepository.save(playerTest)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const GamesRepository = PublicDataSource.getRepository(Game)

        await GamesRepository.delete({})
    }

}
