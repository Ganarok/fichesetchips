import User from "../../database/models/users";
import { CreateUser } from "./users";

export type LoginRequest = {
    username: string;
    password: string;
}

export type Payload = {
    id: string;
    username: string;
    email: string;
}

export type RegisterRequest = CreateUser

export type AuthResponse = {
    user: User;
    access_token: string;
    expires_in: string;
}