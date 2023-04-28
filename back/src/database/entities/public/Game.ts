import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, Unique } from "typeorm"
import { Story } from "./workshop/Story"
import { Player } from "./Players"
import { CMap } from "./workshop/CMap"
import { State } from "./State"

export enum GameStatus {
    PLANNED = "planned",
    RUNNING = "running",
    PAUSED = "paused",
    CLOSED = "closed"
}

@Entity()
@Unique(["id", "state"])
export class Game {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        enum: GameStatus,
        default: GameStatus.PLANNED
    })
    status: GameStatus

    @ManyToOne(type => Story, story => story.games, { onDelete: "CASCADE", nullable: true })
    story: Story;

    @ManyToOne(type => CMap, tilemap => tilemap.games, { onDelete: "CASCADE", nullable: true })
    tilemap: CMap;

    @Column({ default: "cem" })
    universe: string

    @OneToMany(type => Player, player => player.game, { onDelete: "CASCADE", eager: true })
    players: Player[];

    @OneToOne(type => State, { onDelete: "SET NULL", eager: true, nullable: true })
    @JoinColumn()
    state: State
}