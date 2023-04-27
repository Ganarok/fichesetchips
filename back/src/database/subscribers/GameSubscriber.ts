import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm"
import { Character } from "../entities/public/characters/Character";
import { Game, GameStatus } from "../entities/public/Game";
import { State } from "../entities/public/State";
import { PublicDataSource } from "../init/datasources/public-data-source";

@EventSubscriber()
export class GameSubscriber implements EntitySubscriberInterface {
    private StateRepository = PublicDataSource.getRepository(State)
    private CharacterRepository = PublicDataSource.getRepository(Character)

    listenTo() {
        return Game
    }

    async beforeInsert(event: InsertEvent<Game>) {
    }

    async beforeUpdate(event: UpdateEvent<Game>) {
        if (event.entity) {
            const game = event.entity as Game
            if (game.state) {
                if (game.status == GameStatus.PLANNED) {
                    await this.StateRepository.delete(game.state.id)
                } else if (game.status == GameStatus.RUNNING) {
                    // do nothing
                } else if (game.status == GameStatus.PAUSED) {
                    // do nothing
                } else if (game.status == GameStatus.CLOSED) {
                    const state = await this.StateRepository.findOneByOrFail({ id: game.state.id })
                    const characters = state.players.map((data) => {
                        const player = JSON.parse(data)
                        return { id: player.character.id, experience_points: player.character.experience_points }
                    })
                    await this.CharacterRepository.save(characters)
                    await this.StateRepository.delete(game.state.id)
                }
            } else if (game.status == GameStatus.RUNNING) {
                // CREATE state object
                // update game
                const state = new State().fromGame(game)
                await this.StateRepository.save(state)
                game.state = state
            }
            event.entity = game
        }
    }
}
