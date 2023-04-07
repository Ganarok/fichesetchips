import { getMaxListeners } from "process"
import { Game, GameStatus } from "../database/entities/public/Game"
import { Room } from "../database/entities/public/Room"
import { User } from "../database/entities/public/User"
import { PublicDataSource } from "../database/init/datasources/public-data-source"
import { UpdateGame } from "../utils/types/game"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)
const GameRepository = PublicDataSource.getRepository(Game)

// TODO add player state modification on status: pause and status:closed
export async function update(username: string, view_instance: UpdateGame, game_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const game = await GameRepository.findOneByOrFail({ id: game_id })

    try {
        await RoomRepository.findOneByOrFail({ gm: { id: user.id }, game: { id: game_id } })
    } catch {
        throw new Error("You must be gm to update this game")
    }
    game.status = view_instance?.status ?? game.status
    const updated_game = await GameRepository.save(game)
    return updated_game
}