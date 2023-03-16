import { getMaxListeners } from "process"
import { Game } from "../database/entities/public/Game"
import { Room } from "../database/entities/public/Room"
import { User } from "../database/entities/public/User"
import { PublicDataSource } from "../database/init/datasources/public-data-source"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)
const GameRepository = PublicDataSource.getRepository(Game)

export async function update(username: string, body: any, game_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const game = await GameRepository.findOneByOrFail({ id: game_id })
    // Here if the user isn't the gm of the room, it fails
    const room = await RoomRepository.findOneOrFail({
        where: [{ game: game }],
        relations: {
            gm: true,
        }
    })
    if (room.gm.id != user.id) {
        throw new Error("Unauthorized");
    }
    await GameRepository.save({ id: game.id, ...body })
    const game_updated = await GameRepository.findOneByOrFail({ id: game_id })
    return game_updated
}