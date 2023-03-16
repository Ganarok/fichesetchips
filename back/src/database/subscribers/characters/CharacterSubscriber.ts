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

    async beforeUpdate(event: UpdateEvent<any>) {
    }
}
