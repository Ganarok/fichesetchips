import { ApiProperty } from "@nestjs/swagger"
import { defaultUser } from "src/utils/constants/users/users.constants"

export type ROLE = "USER" | "ADMIN" | "SUPERADMIN"

export class UserType {
    @ApiProperty({ default: defaultUser.id })
    id?: string

    @ApiProperty({ default: defaultUser.email })
    email: string

    @ApiProperty({ default: defaultUser.username })
    username: string

    @ApiProperty({ default: defaultUser.password })
    password?: string

    @ApiProperty({ default: defaultUser.avatar })
    avatar: string

    @ApiProperty({ default: defaultUser.role })
    role?: ROLE

    @ApiProperty({ default: defaultUser.preference_id })
    preference_id: string

    @ApiProperty({ default: defaultUser.createdAt })
    createdAt?: string

    @ApiProperty({ default: defaultUser.updatedAt })
    updatedAt?: string
}