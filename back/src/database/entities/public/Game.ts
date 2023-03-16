import { Entity, OneToOne, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique, OneToMany } from "typeorm"
import { Story } from "./workshop/Story"
import { Player } from "./Players"

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

    @ManyToOne(type => Story, story => story.games, { onDelete: "CASCADE" })
    story: Story;

    @Column({ default: "not implemented" })
    map: string

    @Column({ default: "not implemented" })
    universe: string

    @OneToMany(type => Player, player => player.game, { onDelete: "CASCADE" })
    players: Player[];
}