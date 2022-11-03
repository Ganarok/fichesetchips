import { User } from "../../database/entities/User";

export class PublicProfile {
    constructor(user: User) {
        this.email = user.email
        this.username = user.username
        this.avatar = user.avatar
        this.last_connection = user.last_connection
        this.created_at = user.created_at
        this.updated_at = user.updated_at
    }
    email: string;
    username: string;
    avatar: string;
    last_connection: string
    created_at: string
    updated_at: string
}

export type ROLE = "USER" | "ADMIN" | "SUPERADMIN"

export type CreateUser = {
    username: string;
    email: string;
    password: string;
}

export type UpdateUser = {
    username?: string;
    email?: string;
    password?: string;
    avatar?: string;
    preference_id?: string;
}