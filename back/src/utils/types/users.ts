import { User } from "../../database/entities/public/User";

export class PublicProfile {
    constructor(user: User) {
        this.id = user.id
        this.email = user.email
        this.username = user.username
        this.avatar = user.avatar
        this.last_connection = user.last_connection
        this.created_at = user.created_at
        this.updated_at = user.updated_at
    }
    id: string;
    email: string;
    username: string;
    avatar: string;
    last_connection: string
    created_at: string
    updated_at: string
}

export class PrivateProfileWhithoutDate {
    constructor(user: User) {
        this.email = user.email
        this.username = user.username
        this.avatar = user.avatar
        this.id = user.id
        this.password = user.password
        this.role = user.role
        this.preference_id = user.preference_id
    }
    id: string;
    email: string;
    username: string;
    avatar: string;
    password: string;
    role: ROLE;
    preference_id: string;
}

export class PublicProfileWhithoutDate {
    constructor(user: User) {
        this.email = user.email
        this.username = user.username
        this.avatar = user.avatar
    }
    email: string;
    username: string;
    avatar: string;
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