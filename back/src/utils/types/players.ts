import { ArrayContains, ArrayUnique, IsArray, IsBoolean, IsDefined, IsEnum, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator"

export class SetPlayer {

    @IsDefined()
    @IsUUID()
    character_id: string
}