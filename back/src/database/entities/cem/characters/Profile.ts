import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";
import { Calculation } from "./Calculation";
import { Class } from "./Class";
import { Item } from "./Item";

type NAME = "ALL" | "STEALTHY" | "MELEE" | "VERSATILE" | "MAGIC"
export const profileEnum = ["ALL", "STEALTHY", "MELEE", "VERSATILE", "MAGIC"]
@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: profileEnum,
        unique: true
    })
    name: NAME;

    @OneToMany(() => Class, (profil_class) => profil_class.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'class_id',
        referencedColumnName: "id"
    })
    class: Class[]

    @ManyToMany(() => Item)
    @JoinTable({
        name: "profile_weapon",
        joinColumn: { name: "profile_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "item_id", referencedColumnName: "id" }
    })
    items: Item[]

}
