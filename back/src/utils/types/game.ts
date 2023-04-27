import { Game, GameStatus } from "../../database/entities/public/Game"
import { ArrayContains, ArrayUnique, IsUUID, IsEnum, IsArray, IsBoolean, IsDefined, IsNumber, IsString, ValidateNested } from "class-validator"
import { State } from "../../database/entities/public/State"
import { randomUUID } from "crypto"

export class MapGameView {
    @IsDefined()
    @IsUUID()
    id: string
    @IsDefined()
    title: string
    @IsDefined()
    data: {}
}

export class UserGameView {
    @IsDefined()
    @IsUUID()
    id: string
    @IsDefined()
    username: string
}

export class CharacterGameView {
    @IsDefined()
    @IsUUID()
    id: string
    @IsDefined()
    @IsNumber()
    experience_points: number
    @IsDefined()
    @IsNumber()
    hp: number
    @IsDefined()
    firstname: string
    @IsDefined()
    lastname: string
}

export class PlayerGameView {
    @IsDefined()
    @IsUUID()
    id: string
    @IsDefined()
    user: UserGameView
    @IsDefined()
    character: CharacterGameView
}

export class StateGameView {
    @IsDefined()
    @IsUUID()
    id: string
    @IsDefined()
    map: MapGameView
    @IsDefined()
    @IsArray()
    players: PlayerGameView[]
}

export class UpdateGame {
    @IsEnum(GameStatus)
    status?: GameStatus

    state?: StateGameView
}

