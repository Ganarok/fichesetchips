import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Character } from "./Character";

type TYPE = "STANDARD" | "EXOTIC"
type NAME = "COMMON" | "DWARVISH" | "ELVISH" | "GIANT" | "GNOMISH" | "GOBLIN" | "HALFLING" | "ORC" | "ABYSSAL" | "CELESTIAL" | "DRACONIC" | "DEEP SPEECH" | "INFERNAL" | "PRIMORDIAL" | "SYLVAN" | "UNDERCOMMON"
export const languageTypeEnum = ["STANDARD", "EXOTIC"]
export const languageNameEnum = ["COMMON", "DWARVISH", "ELVISH", "GIANT", "GNOMISH", "GOBLIN", "HALFLING", "ORC", "ABYSSAL", "CELESTIAL", "DRACONIC", "DEEP SPEECH", "INFERNAL", "PRIMORDIAL", "SYLVAN", "UNDERCOMMON"]
@Entity()
export class Language {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: languageTypeEnum
    })
    type: TYPE;

    @Column({
        type: "enum",
        enum: languageNameEnum,
        unique: true
    })
    name: NAME;

    // NO NEED
    // @ManyToMany(() => Character)
    // @JoinTable({
    //     name: "character_language",
    //     joinColumn: { name: "language_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "character_id", referencedColumnName: "id" }
    // })
    // characters: Character[]
    // @ManyToMany(() => Race)
    // @JoinTable({
    //     name: "race_language",
    //     joinColumn: { name: "language_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "race_id", referencedColumnName: "id" }
    // })
    // races: Race[]
}
