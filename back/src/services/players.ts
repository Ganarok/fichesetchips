import { getMaxListeners } from "process"
import { Game } from "../database/entities/public/Game"
import { Room } from "../database/entities/public/Room"
import { User } from "../database/entities/public/User"
import { PublicDataSource } from "../database/init/datasources/public-data-source"
import { SetPlayer } from "../utils/types/players"
import { Player } from "../database/entities/public/Players"
import { Character } from "../database/entities/public/characters/Character"

const UserRepository = PublicDataSource.getRepository(User)
const PLayerRepository = PublicDataSource.getRepository(Player)
const CharacterRepository = PublicDataSource.getRepository(Character)

export async function update(username: string, view_instance: SetPlayer, player_id: string) {
    const user = await UserRepository.findOneByOrFail({ username: username })
    const player = await PLayerRepository.findOneByOrFail({ id: player_id })
    const character = await CharacterRepository.findOneByOrFail({ id: view_instance.character_id, user: { id: user.id } })
    player.character = character
    return await PLayerRepository.save(player)
}