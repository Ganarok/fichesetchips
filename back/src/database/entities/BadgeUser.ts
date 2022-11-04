import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";

import { Badge } from "./Badge";
import { User } from "./User";

@Entity()
export class BadgeUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    user_id: string;

    @Column({ type: "uuid" })
    badge_id: string;

    @Column()
    percentage_completion: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string

    @ManyToOne(() => Badge, (badge) => badge.id, { onDelete: ("SET DEFAULT" as OnDeleteType), onUpdate: "CASCADE", eager: true })
    badge: Badge

    @ManyToOne(() => User, (user) => user.id, { onDelete: ("SET DEFAULT" as OnDeleteType), onUpdate: "CASCADE", eager: true })
    user: User
}