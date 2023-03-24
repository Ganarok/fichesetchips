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
    const public_rooms = await RoomRepository.find({
        where: [
            { is_published: true },
        ]
    });

    const user_rooms = await RoomRepository.find({
        where: [
            {
                is_published: false, game: {
                    players: {
                        user: { id: user.id }
                    }
                }
            },
            {
                is_published: false, gm: { id: user.id }
            }
        ]
    })
    return { "user_rooms": user_rooms, "public_rooms": public_rooms }
}

export async function findOne(username: string, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room = await RoomRepository.findOneByOrFail({ id: room_id })


    if (!room.is_published) {
        if (room.gm.id !== user.id && !await is_user_in_game(user.id, room.game)) {
            throw new Error("Unauthorized")
        }
    }
    return room
}

// create room and its associate empty game
export async function create(username: string, room: CreateRoom) {

    const user = await UserRepository.findOneByOrFail({ username: username })
    //TODO add universe, story_id 
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
    if (Object.keys(body).every(elem => ["title", "description", "requirements", "vocal_url", "is_private", "password", "players_nb_max", "is_published"].includes(elem)) == false) {
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

export async function join(username: string, room_id: string, password?: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room_to_join = await RoomRepository.findOneByOrFail({ id: room_id, is_published: true })

    // check user cannot join game if gm
    if (is_user_gm_of_room(user.id, room_to_join)) {
        const err = Error("Invalid operation")
        err.name = "User is gm of this room"
        throw err
    }

    // check password requirements
    check_room_password(room_to_join, password)

    // player creation
    let new_player;
    try {
        new_player = await PLayerRepository.save({ user: user, game: room_to_join.game })

    } catch (error) {
        throw Error("Player already in room")
    }


    room_to_join.game.players.push(new_player)
    await RoomRepository.save(room_to_join)
    return await RoomRepository.findOneBy({ id: room_to_join.id })
}

// return true if user in game else false
export async function is_user_in_game(user_id: string, game: Game): Promise<boolean> {
    const users_fk: Array<string> = []
    for (const player of game.players) {
        const tmp_player = await PLayerRepository.findOneOrFail({ where: { id: player.id }, relations: ["user"] })
        users_fk.push(tmp_player.user.id)
    }
    return users_fk.some((fk) => fk === user_id)
}

// pass check or throw "Unauthorized" error
export function check_room_password(room: Room, password?: string) {
    if (!room.is_private || room.password == null)
        return
    else if (password && room.password === password) {
        return
    }
    else
        throw Error("Unauthorized - proper private room password needed")
}

// return true if use gm of room else false
export function is_user_gm_of_room(user_id: string, room: Room): boolean {
    return room.gm.id === user_id
}
