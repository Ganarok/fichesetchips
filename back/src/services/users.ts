import { JwtPayload } from "jsonwebtoken";
import User from "../database/models/users";
import { CreateUser } from "../utils/types/users";

export async function create(user: CreateUser) {
    return await User.create({ ...user })
}

export async function findOne(payload: JwtPayload) {
    const user = await User.findOne({ where: { username: payload.username } })
    return { user: user }
}

export async function update() {
    return await User.findOne()
}

export async function destroy() {
    return await User.findOne()
}

