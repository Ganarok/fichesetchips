import { Game } from "../../database/entities/public/Game"
import { Player } from "../../database/entities/public/Players"
import { Room } from "../../database/entities/public/Room"
import { User } from "../../database/entities/public/User"
import { Story } from "../../database/entities/public/workshop/Story"
import { PublicDataSource } from "../../database/init/datasources/public-data-source"
import { CreateRoom, UpdateRoom } from "../../utils/types/rooms"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)
const PLayerRepository = PublicDataSource.getRepository(Player)
const GamesRepository = PublicDataSource.getRepository(Game)
const StoryRepository = PublicDataSource.getRepository(Story)

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
export async function create(username: string, room_view: CreateRoom) {

    const user = await UserRepository.findOneByOrFail({ username: username })

    // game inside room
    const new_game = new Game()
    if (room_view.game?.map_id)
        new_game.map = room_view.game.map_id
    if (room_view.game?.universe)
        new_game.universe = room_view.game.universe
    if (room_view.game?.story_id) {
        const story = await StoryRepository.findOneByOrFail({ id: room_view.game.story_id })
        new_game.story = story
    }
    const db_new_game = await GamesRepository.save(new_game)

    // room creation
    let new_room = new Room()
    new_room.gm = user
    new_room.game = db_new_game
    new_room.title = room_view.title
    new_room.description = room_view.description
    new_room.requirements = room_view.requirements
    new_room.vocal_url = room_view.vocal_url
    new_room.players_nb_max = room_view.players_nb_max
    if (room_view.is_private)
        new_room.is_private = room_view.is_private
    if (room_view.password)
        new_room.password = room_view.password

    const room = await RoomRepository.save(new_room)
    return room
}

// publish or unplubished depending on query params value
export async function publish(username: string, body: any, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const room = await RoomRepository.findOneByOrFail({ id: room_id })

    if (room?.gm.id != user.id)
        throw Error("Unauthorized")

    return await RoomRepository.save({ ...room, is_published: body.is_published })

}
export async function update(username: string, room_view: UpdateRoom, room_id: string) {

    const user = await UserRepository.findOneByOrFail({ username: username })
    const room_to_update = await RoomRepository.findOneByOrFail({ gm: { id: user.id }, id: room_id })

    // update room
    try {
        room_to_update.title = room_view.title ? room_view.title : room_to_update.title
        room_to_update.description = room_view.description ? room_view.description : room_to_update.description
        room_to_update.requirements = room_view.requirements ? room_view.requirements : room_to_update.requirements
        room_to_update.vocal_url = room_view.vocal_url ? room_view.vocal_url : room_to_update.vocal_url
        room_to_update.is_private = room_view.is_private ? room_view.is_private : room_to_update.is_private
        room_to_update.password = room_view.password ? room_view.password : room_to_update.password
        room_to_update.players_nb_max = room_view.players_nb_max ? room_view.players_nb_max : room_to_update.players_nb_max
    } catch (error) {
        console.error(error)
        throw Error("Unable to update room values")
    }

    // update game inside room
    if (room_view.game) {
        const game_to_update = await GamesRepository.findOneByOrFail({ id: room_to_update.game.id })
        try {
            game_to_update.status = room_view.game?.status ? room_view.game.status : game_to_update.status
            if (game_to_update.story) {
                game_to_update.story.id = room_view.game?.story_id ? room_view.game.story_id : game_to_update.story.id
            }
            game_to_update.map = room_view.game.map_id ? room_view.game.map_id : game_to_update.map
            game_to_update.universe = room_view.game.universe ? room_view.game.universe : game_to_update.universe
            const updated_game = await GamesRepository.save(game_to_update)
            room_to_update.game = updated_game
        } catch (error) {
            console.error(error)
            throw Error("Unable to update game inside room")
        }
    }
    const updated_room = await RoomRepository.save(room_to_update)
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