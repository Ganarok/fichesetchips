import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    reported: string;

    @Column({ type: "uuid" })
    by: string;

    @ManyToOne(() => User, (user) => user.id, {onDelete: "CASCADE"})
    @JoinColumn({
        name: "reported",
        referencedColumnName: "id"
    })
    user_reported: User

    @ManyToOne(() => User, (user) => user.id, {onDelete: "CASCADE"})
    @JoinColumn({
        name: "by",
        referencedColumnName: "id"
    })
    user_who_reports: User

    @Column()
    reason: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
