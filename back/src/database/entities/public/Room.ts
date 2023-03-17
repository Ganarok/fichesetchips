import { Entity, OneToOne, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique } from "typeorm"
import { Player } from "./Players"
import { Game } from "./Game"
import { User } from "./User"

@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({ type: "text" })
    description: string

    @Column({ type: "text" })
    requirements: string

    @Column()
    vocal_url: string

    @Column({ type: "boolean", default: false })
    is_private: boolean

    @Column({ type: "boolean", default: false })
    is_published: boolean

    @Column({ nullable: true })
    password: string

    @Column()
    players_nb_max: number

    @ManyToOne(() => User, user => user.rooms, { onDelete: "CASCADE", eager: true })
    gm: User

    @OneToOne(type => Game, { onDelete: "CASCADE", eager: true })
    @JoinColumn()
    game: Game

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}