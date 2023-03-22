import { Game } from "../../database/entities/public/Game"
import { Player } from "../../database/entities/public/Players"
import { Room } from "../../database/entities/public/Room"
import { User } from "../../database/entities/public/User"
import { PublicDataSource } from "../../database/init/datasources/public-data-source"
import { CreateRoom, UpdateRoom } from "../../utils/types/rooms"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)
const PLayerRepository = PublicDataSource.getRepository(Player)
const GamesRepository = PublicDataSource.getRepository(Game)

export async function findAll(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const rooms = await RoomRepository.find({
        where: [
            { gm: { id: user.id } }, // rooms where the gm is the user
            { is_private: false }, // rooms that are not private
            // { // rooms that are private and have the user as a player
            //     is_private: true,
            //     game: {
            //         players: {
            //             user: { id: user.id }
            //         }
            //     }
            // }
        ]
    });

    const rooms_player_in = await RoomRepository.find({
        where: [
            {
                is_private: true, game: {
                    players: {
                        user: { id: user.id }
                    }
                }
            }
        ]
    })
    return rooms.concat(rooms_player_in)
}

export async function findOne(username: string, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const rooms_pub = await RoomRepository.findOneByOrFail({ id: room_id, is_private: false })
    return rooms_pub
}

// create room and its associate empty game
export async function create(username: string, room: CreateRoom) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const new_game = await GamesRepository.save(new Game())
    const rooms = await RoomRepository.save({ ...room, gm: user, game: new_game })
    return rooms
}

// publish or unplubished depending on query params value
export async function publish(username: string, body: any, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room = await RoomRepository.findOneByOrFail({ id: room_id })

    if (room?.gm.id != user.id)
        throw Error("Unauthorized")

    return await RoomRepository.save({ ...room, is_published: body.is_published })

}
export async function update(username: string, body: UpdateRoom, room_id: string) {
    if (Object.keys(body).every(elem => ["title", "description", "requirements", "vocal_url", "is_private", "password", "players_nb_max"].includes(elem)) == false) {
        throw new Error("Unexpected parameters")
    }
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room = await RoomRepository.findOneByOrFail({ gm: { id: user.id }, id: room_id })
    const updated_room = await RoomRepository.save({ ...room, ...body })
    return updated_room
}

export async function destroy(username: string, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room_to_delete = await RoomRepository.delete({ id: room_id, gm: { id: user.id } })
    return room_to_delete
}

export async function join(username: string, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room_to_join = await RoomRepository.findOneByOrFail({ id: room_id })

    // links resources
    const new_player = await PLayerRepository.save({ user: user })
    room_to_join.game.players.push(new_player)
    return await RoomRepository.save(room_to_join)
}