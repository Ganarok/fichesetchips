import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Story } from "./workshop/Story"
import { Player } from "./Players"
import { CMap } from "./workshop/CMap"

export enum GameStatus {
    PLANNED = "planned",
    RUNNING = "running",
    PAUSED = "paused",
    CLOSED = "closed"
}

@Entity()
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

    @Column({ default: "not implemented" })
    universe: string

    @OneToMany(type => Player, player => player.game, { onDelete: "CASCADE", eager: true })
    players: Player[];
}