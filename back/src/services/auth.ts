import User from "../database/models/users";
import * as usersService from "../services/users"
import { AuthResponse, LoginRequest, Payload, RegisterRequest } from "../utils/types/auth";
import * as jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
dotenv.config()

const jwtSecret = process.env.JWTSECRET || "SECRET"

export async function login(user: LoginRequest): Promise<AuthResponse> {
    const found_user = await validate(user)
    const payload: Payload = { username: found_user.username, id: found_user.id, email: found_user.email };
    return {
        user: found_user,
        access_token: jwt.sign(payload, jwtSecret),
        expires_in: (process.env.expiresIn || '3600s')
    }
}

export async function register(user: RegisterRequest): Promise<AuthResponse> {
    const new_user = await usersService.create(user)
    const payload: Payload = { username: new_user.username, id: new_user.id, email: new_user.email };
    return {
        user: new_user,
        access_token: jwt.sign(payload, jwtSecret),
        expires_in: (process.env.expiresIn || '3600s')
    }
}

async function validate(user: LoginRequest): Promise<User> {
    const found_user = await User.findOne({ where: { username: user.username } })
    if (found_user && await bcrypt.compare(user.password, found_user.password)) {
        return found_user
    } else {
        throw new Error("Wrong username or password")
    }
}