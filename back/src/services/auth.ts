import * as usersService from "../services/users"
import { AuthResponse, LoginRequest, Payload, RegisterRequest } from "../utils/types/auth";
import * as jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
import { User } from "../database/entities/User";
import { AppDataSource } from "../database/data-source";
dotenv.config()

const UserRepository = AppDataSource.getRepository(User)
const jwtSecret = process.env.JWTSECRET || "SECRET"

export async function login(user: LoginRequest): Promise<AuthResponse> {
    if (Object.keys(user).every(elem => ["username", "password"].includes(elem)) == false) {// != ["username", "email", "password"]) {
        throw new Error("Unexpected parameters")
    }
    const found_user = await validate(user)
    const payload: Payload = { username: found_user.username, id: found_user.id, email: found_user.email };
    return {
        user: found_user,
        access_token: jwt.sign(payload, jwtSecret),
        expires_in: (process.env.expiresIn + 's' || '3600s')
    }
}

export async function register(user: RegisterRequest): Promise<AuthResponse> {
    if (Object.keys(user).every(elem => ["username", "email", "password"].includes(elem)) == false) {// != ["username", "email", "password"]) {
        throw new Error("Unexpected parameters")
    }
    const new_user = await usersService.create(user)
    const payload: Payload = { username: new_user.username, id: new_user.id, email: new_user.email };
    return {
        user: new_user,
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