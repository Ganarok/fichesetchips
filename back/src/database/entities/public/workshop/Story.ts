import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique, OneToMany } from "typeorm"
import { User } from "../User";
import { Game } from "../Game";

@Entity()
@Unique(['creatorId', 'title'])
export class Story {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    creatorId: string;

    @Column()
    title: string;

    @Column({type: "bytea"})
    file: Buffer;

    @ManyToOne(type => User, user => user.stories, { onDelete: "CASCADE" })
    creator: User

    @OneToMany(type => Game, game => game.story)
    games: Game[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
