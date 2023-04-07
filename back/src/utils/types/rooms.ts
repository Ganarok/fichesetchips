import { ArrayContains, ArrayUnique, IsArray, IsBoolean, IsDefined, IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator"
import { GameStatus } from "../../database/entities/public/Game"
import { User } from "../../database/entities/public/User"

export class CreateGameInRoom {

    @IsUUID()
    story_id?: string

    @IsString()
    universe?: string = "cem"

    @IsUUID()
    map_id?: string
}

export class CreateRoom {
    @IsDefined()
    @IsString()
    title: string

    @IsDefined()
    @IsString()
    description: string

    @IsDefined()
    @IsString()
    requirements: string

    @IsDefined()
    @IsString()
    vocal_url: string

    @IsDefined()
    @IsNumber()
    players_nb_max: number

    @IsBoolean()
    is_private?: boolean = false

    @IsString()
    password?: string

    game?: CreateGameInRoom
}


export class UpdateGameInRoom {

    @IsEnum(GameStatus)
    status?: GameStatus

    @IsUUID()
    story_id?: string

    @IsUUID()
    map_id?: string

    @IsString()
    universe?: string
}

export class UpdateRoom {

    @IsString()
    title?: string

    @IsString()
    description?: string

    @IsString()
    requirements?: string

    @IsString()
    vocal_url?: string

    @IsBoolean()
    is_private?: boolean

    @IsString()
    password?: string

    @IsNumber()
    players_nb_max?: number

    game?: UpdateGameInRoom
}