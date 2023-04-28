import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Story } from "./workshop/Story"
import { Player } from "./Players"
import { CMap } from "./workshop/CMap"
import { MapGameView, PlayerGameView, StateGameView, UpdateGame } from "../../../utils/types/game"
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

    private buildPlayers(players: Player[] | PlayerGameView[]): string[] {
        return players.map(
            player => {
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
                        lastname: player.character.lastname
                    }
                } as PlayerState)
            }
        )
    }

    public fromGame(game: Game): State {
        return {
            id: game.state ? game.state.id ? game.state.id : randomUUID() : randomUUID(),
            map: { id: game.tilemap.id, title: game.tilemap.title, data: game.tilemap.data } as MapState,
            players: this.buildPlayers(game.players)
        } as State
    }
    public fromStateGameView(state: StateGameView): State {
        console.log("fromgameview")
        return {
            id: state.id,
            map: state.map as MapState,
            players: this.buildPlayers(state.players)
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
    }
}