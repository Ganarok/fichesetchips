import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";
import { Calculation } from "./Calculation";
import { Character } from "./Character";
import { Profile } from "./Profile";

type NAME = "BARBARIAN" | "BARD" | "CLERIC" | "DRUID" | "FIGHTER" | "MONK" | "PALADIN" | "RANGER" | "ROGUE" | "SORCERER" | "WARLOCK" | "WIZARD"

@Entity()
export class Money {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    gold: number

    @Column()
    silver: number

    @Column()
    copper: number

    @Column({type: "uuid"})
    character_id: string

    @OneToOne(() => Character, (character) => character.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({
        name: 'character_id',
        referencedColumnName: "id"
    })
    character: Character
}
