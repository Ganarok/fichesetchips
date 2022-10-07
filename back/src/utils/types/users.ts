export type ROLE = "USER" | "ADMIN" | "SUPERADMIN"

export type CreateUser = {
    username: string;
    email: string;
    password: string;
}