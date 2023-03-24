import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Character } from "./characters/Character";
import { Game } from "./Game";
import { User } from "./User";



@Entity()
@Unique(["user", "game"])
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