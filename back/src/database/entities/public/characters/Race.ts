import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";
import { Calculation } from "./Calculation";
import { Character } from "./Character";
import { Characteristic } from "./Characteristic";
import { Language } from "./Language";
import { RaceCharacteristic } from "./RaceCaracteristic";

type NAME = "DWARF" | "ELF" | "HALFLING" | "HUMAN" | "GNOME" | "HALF-ELF" | "HALF-ORC" | "TIEFLING"
type SIZE = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "HUGE" | "GARGANTUAN"
export const raceEnum = ["DWARF", "ELF", "HALFLING", "HUMAN", "GNOME", "HALF-ELF", "HALF-ORC", "TIEFLING"]
export const sizeEnum = ["TINY", "SMALL", "MEDIUM", "LARGE", "HUGE", "GARGANTUAN"]
export const raceFrenchEnum = ["ELFE", "HALFELIN", "HUMAIN", "NAIN", "DEMI-ELFE", "DEMI-ORC", "GNOME", "TIEFFELIN"]

@Entity()
export class Race {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: raceEnum,
        unique: true
    })
    name: NAME;

    @Column({
        type: "enum",
        enum: raceFrenchEnum,
        unique: true
    })
    french_name: NAME;

    @Column({
        type: "enum",
        enum: sizeEnum,
    })
    size: SIZE;

    @Column()
    speed: number

    @Column()
    adult_age: number

    @Column()
    max_age: number

    @Column({ type: "uuid" })
    calculation_height: string

    @Column()
    calculation_weight: string

    @Column()
    nb_free_standard_language: number

    @ManyToOne(() => Calculation, (calculation) => calculation.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({
        name: 'calculation_height',
        referencedColumnName: "id"
    })
    height: Calculation

    @ManyToOne(() => Calculation, (calculation) => calculation.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({
        name: 'calculation_weight',
        referencedColumnName: "id"
    })
    weight: Calculation

    @OneToMany(() => Character, (character) => character.race)
    characters: Character[]

    @ManyToMany(() => Language)
    @JoinTable({
        name: "race_language",
        joinColumn: { name: "race_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "language_id", referencedColumnName: "id" }
    })
    languages: Language[]

    @OneToMany(() => RaceCharacteristic, (race_characteristic) => race_characteristic.race)
    racial_bonus: RaceCharacteristic[]

    // @ManyToMany(() => Characteristic)
    // @JoinTable({
    //     name: "race_characteristc",
    //     joinColumn: { name: "race_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "characteristic_id", referencedColumnName: "id" }
    // })
    // characteristics: Characteristic[]
}
