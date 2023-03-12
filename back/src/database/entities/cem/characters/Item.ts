import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { ItemStat } from "./ItemStat";
import { Profile } from "./Profile";

type TYPE = "ARMOR" | "WEAPON" | "TOOL" | "OBJECT" | "AMMUNITION" | "ADVENTURING GEAR"
export const itemEnum = ["ARMOR", "WEAPON", "TOOL", "OBJECT", "AMMUNITION", "ADVENTURING GEAR"]
@Entity()
export class Item {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    french_name: string

    @Column()
    name: string

    @Column({
        type: "enum",
        enum: itemEnum
    })
    type: TYPE

    @Column()
    cost: number

    @Column()
    piece: string

    @OneToOne(() => ItemStat, (item_stat) => item_stat.item)
    item_stat: ItemStat
    // NO NEED
    // @ManyToMany(() => Profile)
    // @JoinTable({
    //     name: "profile_weapon",
    //     joinColumn: { name: "item_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "profile_id", referencedColumnName: "id" }
    // })
    // profiles: Profile[]
}
