import { JwtPayload } from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { CreateUser, PublicProfile } from "../utils/types/users";

const UserRepository = AppDataSource.getRepository(User)
export async function create(user: CreateUser) {
    const new_user = await UserRepository.save(user)
    return new_user
}

export async function findProfile(payload: JwtPayload) {
    const user = await UserRepository.findOneByOrFail({ username: payload.username })
    return { user: user }
}

export async function findPublicProfile(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    let public_profile = new PublicProfile(user)
    return { user: public_profile }
}

