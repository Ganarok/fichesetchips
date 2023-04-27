import * as usersService from "../services/users"
import { AuthResponse, LoginRequest, Payload, RegisterRequest } from "../utils/types/auth";
import * as jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
import { User } from "../database/entities/public/User";
import { PublicDataSource } from "../database/init/datasources/public-data-source";
dotenv.config()

const UserRepository = PublicDataSource.getRepository(User)
const jwtSecret = process.env.JWTSECRET || "SECRET"

export async function login(user: LoginRequest) {
    if (Object.keys(user).every(elem => ["username", "password"].includes(elem)) == false) {
        throw new Error("Unexpected parameters")
    }
    const found_user = await validate(user)
    const payload: Payload = { username: found_user.username, id: found_user.id, email: found_user.email };
    return {
        user: {
            "id": found_user.id,
            "email": found_user.email,
            "username": found_user.username,
            "avatar": found_user.avatar,
            "role": found_user.role,
            "preference_id": found_user.preference_id,
            "last_connection": found_user.last_connection,
            "created_at": found_user.created_at,
            "updated_at": found_user.updated_at
        },
        access_token: jwt.sign(payload, jwtSecret),
        expires_in: (process.env.expiresIn + 's' || '3600s')
    }
}

export async function register(user: RegisterRequest) {
    if (Object.keys(user).every(elem => ["username", "email", "password", "avatar", "preference_id"].includes(elem)) == false) {
        throw new Error("Unexpected parameters")
    }
    const new_user = await usersService.create(user)
    const payload: Payload = { username: new_user.username, id: new_user.id, email: new_user.email };
    return {
        user: {
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username,
            "avatar": new_user.avatar,
            "role": new_user.role,
            "preference_id": new_user.preference_id,
            "last_connection": new_user.last_connection,
            "created_at": new_user.created_at,
            "updated_at": new_user.updated_at
        },
        access_token: jwt.sign(payload, jwtSecret),
        expires_in: (process.env.expiresIn + 's' || '3600s')
    }
}

async function validate(user: LoginRequest) {
    const found_user = await UserRepository.findOneByOrFail({ username: user.username })
    await UserRepository.save({ id: found_user.id, last_connection: new Date().toISOString() })
    if (found_user && await bcrypt.compare(user.password, found_user.password)) {
        return found_user
    } else {
        throw new Error("Wrong username or password")
    }
}