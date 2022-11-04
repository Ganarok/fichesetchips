import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad } from "typeorm"
import { BadgeUser } from "./BadgeUser";
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";

@Entity()
export class Badge {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}