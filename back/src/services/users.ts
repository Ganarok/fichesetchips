import { JwtPayload } from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { Payload } from "../utils/types/auth";
import { CreateUser, PublicProfile, UpdateUser } from "../utils/types/users";
import * as jwt from "jsonwebtoken"

const jwtSecret = process.env.JWTSECRET || "SECRET"
const UserRepository = AppDataSource.getRepository(User)

export async function create(user: CreateUser) {
    const new_user = await UserRepository.save(user)
    return new_user
}

export async function findProfile(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    return { user: user }
}

export async function findPublicProfile(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    let public_profile = new PublicProfile(user)
    return { user: public_profile }
}

export async function update(username: string, parameters: UpdateUser) {
    if (Object.keys(parameters).every(elem => ["username", "email", "password", "avatar", "preference_id"].includes(elem)) == false) {
        throw new Error("Unexpected parameters")
    }
    const user = await UserRepository.findOneByOrFail({ username: username })
    await UserRepository.save({ id: user.id, ...parameters })
    const new_user = await UserRepository.findOneByOrFail({ id: user.id })
    const payload: Payload = { username: new_user.username, id: new_user.id, email: new_user.email };
    return {
        user: new_user,
        access_token: jwt.sign(payload, jwtSecret),
        expires_in: (process.env.expiresIn + 's' || '3600s')
    }
}

export async function destroy(username: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    await UserRepository.remove(user)
    return { user: user }
}


