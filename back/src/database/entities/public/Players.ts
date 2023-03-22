import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Character } from "./characters/Character";
import { Game } from "./Game";
import { User } from "./User";



@Entity()
export class Player {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => User, user => user.players, { onDelete: "CASCADE" })
    user: User;

    @OneToOne(type => Character, { onDelete: "CASCADE" })
    @JoinColumn()
    character: Character

    @ManyToOne(type => Game, game => game.players, { onDelete: "CASCADE" })
    game: Game;

    @Column({ default: "not implemented" })
    state: string
}