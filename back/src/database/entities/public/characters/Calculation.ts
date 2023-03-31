import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Class } from "./Class";
import { Race } from "./Race";

type FOR = "HEIGHT" | "WEIGHT" | "COINS"
export const forEnum = ["HEIGHT", "WEIGHT", "COINS"]

@Entity()
export class Calculation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "float"})
    base: number

    @Column()
    operator_1: string

    @Column()
    dice_repetition: number

    @Column()
    dice_faces: number

    @Column()
    operator_2: string

    @Column({type: "float"})
    modificator: number

    @Column({
        type: "enum",
        enum: forEnum
    })
    for: FOR;

    @OneToMany(() => Class, (character_class) => character_class.money, { onDelete: "CASCADE" })
    class: Class[]

    @OneToMany(() => Race, (race) => race.weight, { onDelete: "CASCADE" })
    race_weight: Race[]

    @OneToMany(() => Race, (race) => race.height, { onDelete: "CASCADE" })
    race_height: Race[]

}
