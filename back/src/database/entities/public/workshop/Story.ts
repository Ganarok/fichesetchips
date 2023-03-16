import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique, OneToMany } from "typeorm"
import { User } from "../User";
import { Game } from "../Game";

@Entity()
@Unique(['user_id', 'title'])
export class Story {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    user_id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    path: string;

    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: "id"
    })
    creator: User

    @OneToMany(type => Game, game => game.story, { onDelete: "CASCADE" })
    games: Game[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
