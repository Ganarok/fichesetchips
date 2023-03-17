import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique } from "typeorm"
import { User } from "../User";
import { CMap } from "./CMap";

@Entity()
@Unique(['cmapId', 'name'])
export class Asset {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    // Here, i added cmapIp in order to add Unique constraint on ['cmapId', 'name']
    @Column({ type: "uuid" })
    cmapId: string;

    @Column({type: "bytea"})
    image: Buffer;

    @ManyToOne(type => CMap, cmap => cmap.assets, { onDelete: "CASCADE" })
    cmap: CMap

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
