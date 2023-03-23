import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique } from "typeorm"
import { User } from "../User";

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

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
