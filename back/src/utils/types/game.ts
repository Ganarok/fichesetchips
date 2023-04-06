import { IsUUID, IsEnum } from "class-validator"
import { GameStatus } from "../../database/entities/public/Game"


export class PlayerState {
    inventory?: string
    xp?: string
    caracteristics?: string
    current_hp?: string
}

export class UpdateGame {
    @IsEnum(GameStatus)
    status?: GameStatus

    players_state?: PlayerState[]
}

