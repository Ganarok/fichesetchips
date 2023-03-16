import { Room } from "../../database/entities/public/Room"
import { User } from "../../database/entities/public/User"
import { PublicDataSource } from "../../database/init/datasources/public-data-source"

const UserRepository = PublicDataSource.getRepository(User)
const RoomRepository = PublicDataSource.getRepository(Room)


export async function findAll(username: string) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ where: { gmId: user.id } })
    // return rooms
}
export async function findOne(username: string, room_id: string) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ user_id: user.id })
    // return rooms
}
export async function create(username: string, room: any) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ user_id: user.id })
    // return rooms
}
export async function publish(username: string, body: any, room_id: string) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ user_id: user.id })
    // return rooms
}
export async function update(username: string, body: any, room_id: string) {
    // const user = await UserRepository.findOneByOrFail({ username: username })
    // const rooms = await RoomRepository.find({ user_id: user.id })
    // return rooms
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