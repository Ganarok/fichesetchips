import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique } from "typeorm"
import { User } from "./User";

@Entity()
@Unique(['user_asked_id', 'user_answered_id'])
export class Friend {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    user_asked_id: string;

    @Column({ type: "uuid" })
    user_answered_id: string;

    @Column({ type: "boolean", default: false })
    accepted: boolean;

    @Column({ type: "integer", default: 0 })
    nb_games: number;

    @ManyToOne(() => User, (user) => user.id, {onDelete: "CASCADE"})
    @JoinColumn({
        name: 'user_asked_id',
        referencedColumnName: "id"
    })
    user_asked: User

    @ManyToOne(() => User, (user) => user.id, {onDelete: "CASCADE"})
    @JoinColumn({
        name: 'user_answered_id',
        referencedColumnName: "id"
    })
    user_answered: User

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
