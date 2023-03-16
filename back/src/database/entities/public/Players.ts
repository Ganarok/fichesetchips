import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Game } from "./Game";
import { User } from "./User";



@Entity()
export class Player {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => User, user => user.players)
    user: User;

    @Column({ default: "not implemented" })
    character: string

    @ManyToOne(type => Game, game => game.players)
    game: Game;

    @Column({ default: "not implemented" })
    state_id: string
}