import { ApiProperty } from "@nestjs/swagger"

export type ROLE = "USER" | "ADMIN"

export const defaultUser: UserType = {
    id: 1,
    username: "user0",
    password: "password",
    avatar: "url",
    role: "USER",
    preference_id: 1,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}

export class UserType {
    @ApiProperty({ default: defaultUser.id })
    id?: number

    @ApiProperty({ default: defaultUser.username })
    username: string

    @ApiProperty({ default: defaultUser.password })
    password?: string

    @ApiProperty({ default: defaultUser.avatar })
    avatar: string

    @ApiProperty({ default: defaultUser.role })
    role?: ROLE

    @ApiProperty({ default: defaultUser.preference_id })
    preference_id: number

    @ApiProperty({ default: defaultUser.createdAt })
    createdAt?: string

    @ApiProperty({ default: defaultUser.updatedAt })
    updatedAt?: string
}

export const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png"

export const users = [
    {
        username: "user0",
        password: "$2b$10$3XdQgbcvMMuopZpiWgJi0.6AZxRxP45vCaRyoSJyv/35YtDM3MUA6",
        avatar: defaultAvatar,
        role: "USER",
        preference_id: 1
    },
    {
        username: "admin",
        password: "$2b$10$3XdQgbcvMMuopZpiWgJi0.6AZxRxP45vCaRyoSJyv/35YtDM3MUA6",
        avatar: defaultAvatar,
        role: "ADMIN",
        preference_id: 1
    }
]