import { Room } from "../../database/entities/public/Room"
import { User } from "../../database/entities/public/User"
import { PublicDataSource } from "../../database/init/datasources/public-data-source"
import { CreateRoom, UpdateRoom } from "../../utils/types/rooms"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)


export async function findAll(username: string) {


    // console.log("findall")
    const user = await UserRepository.findOneByOrFail({ username: username })
    const rooms = await RoomRepository.find({
        relations: ["gm"],
        where: [
            { gm: { id: user.id } },
            { is_private: false, is_published: true }
        ]
    })

    // // created by me not published
    // // created by me published
    // // not created by me public
    // // not created by me private
    // // isin
    // const rooms = await RoomRepository.createQueryBuilder("room").getMany()

    // rooms.filter((room: Room) => {
    //     room.gm.id == user.id
    // })
    // console.log(rooms)
    return rooms
}
export async function findOne(username: string, room_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const rooms = await RoomRepository.find({ where: { id: room_id } })
    return rooms
}
export async function create(username: string, room: CreateRoom) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const rooms = await RoomRepository.save({ ...room, gm: user })
    return rooms
}
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
    console.log(user)
    console.log(room_id)
    const room = await RoomRepository.findOneByOrFail({ gm: user, id: room_id })
    console.log("User:", user)
    console.log("ROom.gm:", room)
    let a = await RoomRepository.save({ ...room, ...body })
    console.log("A: ")
    console.log(a)
    return a
}
export async function destroy(username: string, room_id: string) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ user_id: user.id })
    // return rooms
}
export async function join(username: string, room_id: string) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ user_id: user.id })
    // return rooms
}