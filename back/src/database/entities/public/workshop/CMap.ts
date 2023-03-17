import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad, Unique, OneToMany } from "typeorm"
import { User } from "../User";
import { Asset } from "./Asset";

@Entity()
@Unique(['creatorId', 'title'])
export class CMap {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ type: "json" })
    data: {};

    // Here, i added creatorId in order to add Unique constraint on ['creatorId', 'title']
    @Column({ type: "uuid" })
    creatorId: string;

    @ManyToOne(type => User, user => user.maps, { onDelete: "CASCADE" })
    creator: User

    @OneToMany(type => Asset, tmap => tmap.cmap, {
        cascade: true,
        eager: true
    })
    assets: Asset[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
