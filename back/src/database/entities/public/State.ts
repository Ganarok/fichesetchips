import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Story } from "./workshop/Story"
import { Player } from "./Players"
import { CMap } from "./workshop/CMap"
import { CharacterGameView, MapGameView, PlayerGameView, StateGameView, UpdateGame } from "../../../utils/types/game"
import { Game, GameStatus } from "./Game"
import { randomUUID } from "crypto"

@Entity()
export class State {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "json" })
    map: MapState

    @Column('text', { array: true })
    players: string[]

    private buildPlayersFromGame(players: Player[]): string[] {
        return players.map(
            (player: Player) => {
                return JSON.stringify({
                    id: player.id,
                    user: {
                        id: player.user.id,
                        username: player.user.username
                    },
                    character: {
                        id: player.character.id,
                        experience_points: player.character.experience_points,
                        hp: player.character.hp,
                        firstname: player.character.firstname,
                        lastname: player.character.lastname,
                        x: null,
                        y: null
                    }
                } as PlayerState)
            }
        )
    }

    private buildPlayersFromStateGameView(players: PlayerGameView[]): string[] {
        return players.map(
            (player: PlayerGameView) => {
                return JSON.stringify({
                    id: player.id,
                    user: {
                        id: player.user.id,
                        username: player.user.username
                    },
                    character: {
                        id: player.character.id,
                        experience_points: player.character.experience_points,
                        hp: player.character.hp,
                        firstname: player.character.firstname,
                        lastname: player.character.lastname,
                        x: player.character.x ? player.character.x : null,
                        y: player.character.y ? player.character.y : null
                    }
                } as PlayerState)
            }
        )
    }

    public fromGame(game: Game): State {
        return {
            id: game.state ? game.state.id ? game.state.id : randomUUID() : randomUUID(),
            map: { id: game.tilemap.id, title: game.tilemap.title, data: game.tilemap.data } as MapState,
            players: this.buildPlayersFromGame(game.players)
        } as State
    }
    public fromStateGameView(state: StateGameView): State {
        return {
            id: state.id,
            map: state.map as MapState,
            players: this.buildPlayersFromStateGameView(state.players)
        } as State
    }
}

export type MapState = {
    id: string
    title: string
    data: {}
}

export type PlayerState = {
    id: string
    user: {
        id: string
        username: string
    }
    character: {
        id: string
        experience_points: number
        hp: number
        firstname: string
        lastname: string
        x: number | null
        y: number | null
    }
}