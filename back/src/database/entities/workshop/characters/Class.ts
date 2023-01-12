import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";
import { Calculation } from "./Calculation";
import { Character } from "./Character";
import { Characteristic } from "./Characteristic";
import { Profile } from "./Profile";
import { Skill } from "./Skill";

type NAME = "BARBARIAN" | "BARD" | "CLERIC" | "DRUID" | "FIGHTER" | "MONK" | "PALADIN" | "RANGER" | "ROGUE" | "SORCERER" | "WARLOCK" | "WIZARD"
export const classEnum = ["BARBARIAN", "BARD", "CLERIC", "DRUID", "FIGHTER", "MONK", "PALADIN", "RANGER", "ROGUE", "SORCERER", "WARLOCK", "WIZARD"]
export const classFrenchEnum = ["BARBARE", "BARDE", "CLERC", "DRUIDE", "GUERRIER", "MOINE", "PALADIN", "RÔDEUR", "ROUBLARD", "ENSORCELEUR", "OCCULTISTE", "MAGICIEN"]

@Entity()
export class Class {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: classEnum,
        unique: true
    })
    name: NAME;

    @Column({
        type: "enum",
        enum: classFrenchEnum,
        unique: true
    })
    french_name: NAME;

    @Column()
    hit_dice: number

    @Column({ type: "boolean" })
    light_armor: boolean

    @Column({ type: "boolean" })
    medium_armor: boolean

    @Column({ type: "boolean" })
    heavy_armor: boolean

    @Column({ type: "boolean" })
    shield: boolean

    @Column({ type: "uuid" })
    profile_id: string

    @Column({ type: "uuid" })
    money_dice: string

    @Column()
    skill_nb: number

    @ManyToOne(() => Profile, (profile) => profile.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'profile_id',
        referencedColumnName: "id"
    })
    profile: Profile

    @ManyToOne(() => Calculation, (calculation) => calculation.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'money_dice',
        referencedColumnName: "id"
    })
    money: Calculation

    @OneToMany(() => Character, (character) => character.class)
    characters: Character[]

    @ManyToMany(() => Skill)
    @JoinTable({
        name: "class_skill",
        joinColumn: { name: "class_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "skill_id", referencedColumnName: "id" }
    })
    skills: Skill[]

    @ManyToMany(() => Characteristic)
    @JoinTable({
        name: "saving_thrown",
        joinColumn: { name: "class_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "characteristic_id", referencedColumnName: "id" }
    })
    saving_throws: Characteristic[]
}
