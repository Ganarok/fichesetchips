import { getMaxListeners } from "process"
import { Game, GameStatus } from "../database/entities/public/Game"
import { Room } from "../database/entities/public/Room"
import { User } from "../database/entities/public/User"
import { State } from "../database/entities/public/State"
import { PublicDataSource } from "../database/init/datasources/public-data-source"
import { UpdateGame } from "../utils/types/game"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)
const GameRepository = PublicDataSource.getRepository(Game)
const StateRepository = PublicDataSource.getRepository(State)

// TODO add player state modification on status: pause and status:closed
export async function update(username: string, view_instance: UpdateGame, game_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const game = await GameRepository.findOneOrFail({ where: { id: game_id }, relations: { players: { user: true, character: true }, story: true, tilemap: true } })

    try {
        await RoomRepository.findOneByOrFail({ gm: { id: user.id }, game: { id: game_id } })
    } catch {
        throw new Error("You must be gm to update this game")
    }
    if (game.players.length < 1) {
        throw new Error("You must have at least one player to start a game")
    }
    game.status = view_instance.status ? view_instance.status : game.status
    game.state = view_instance.state && view_instance.state != null ? new State().fromStateGameView(view_instance.state) : game.state
    if (view_instance.state) {
        await StateRepository.save(game.state)
    }
    await GameRepository.save(game)
    const updated_game = await GameRepository.findOneOrFail({ where: { id: game_id }, relations: { players: { user: true, character: true }, story: true, tilemap: true } })
    if (updated_game.state && updated_game.state.players.length >= 0) {
        updated_game.state.players = updated_game.state.players.map(player => JSON.parse(player))
    }
    return updated_game
}