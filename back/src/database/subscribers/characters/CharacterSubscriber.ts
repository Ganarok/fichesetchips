import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm"
import { Character } from "../../entities/public/characters/Character";
import { Level } from "../../entities/public/characters/Level";
import { PublicDataSource } from "../../init/datasources/public-data-source";


@EventSubscriber()
export class CharacterSubscriber implements EntitySubscriberInterface {
    listenTo() {
        return Character
    }

    async beforeInsert(event: InsertEvent<Character>) {
        if (event.entity.level_id) {
            const LevelRepository = await PublicDataSource.getRepository(Level)
            const level = await LevelRepository.findOneOrFail({ where: { id: event.entity.level_id } })
            const levelSup = await LevelRepository.findOneOrFail({ where: { id: event.entity.level_id + 1 } })
            event.entity.experience_points = level.experience_points
            event.entity.next_level_experience_points = levelSup.experience_points - level.experience_points
            return;
        }
    }

    async beforeUpdate(event: UpdateEvent<Character>) {
        if (event.entity && event.entity.experience_points) {
            const xp = event.entity.experience_points
            const LevelRepository = await PublicDataSource.getRepository(Level)
            const CharacterRespository = await PublicDataSource.getRepository(Character)
            const character = await CharacterRespository.findOneByOrFail({ id: event.entity.id })
            const previous_xp = character.experience_points
            event.entity.experience_points = previous_xp + xp
            if (previous_xp + xp >= character.next_level_experience_points) {
                event.entity.level_id = character.level_id + 1
                const next_level = await LevelRepository.findOneOrFail({ where: { id: (event.entity.level_id + 1) } })
                event.entity.next_level_experience_points = next_level.experience_points
            }
            return;
        }
    }
}
