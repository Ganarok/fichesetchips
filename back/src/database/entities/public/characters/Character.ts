import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";
import { User } from "../User";
import { CharacterCharacteristic } from "./CharacterCaracteristic";
import { Characteristic } from "./Characteristic";
import { Class } from "./Class";
import { Equipment } from "./Equipment";
import { Item } from "./Item";
import { Language } from "./Language";
import { Level } from "./Level";
import { Money } from "./Money";
import { Race } from "./Race";
import { Skill } from "./Skill";

@Entity()
export class Character {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    user_id: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    sex: string;

    @Column()
    eye_color: string;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    clothing_color_1: string;

    @Column()
    clothing_color_2: string;

    @Column({ type: "text" })
    bio: string

    @Column()
    alignment: string

    @Column({ type: "text" })
    ideals: string

    @Column({ type: "text" })
    flaws: string

    @Column()
    age: number

    @Column()
    weight: number

    @Column()
    height: number

    @Column()
    hp: number

    @Column({ type: "uuid" })
    race_id: string

    @Column({ type: "uuid" })
    class_id: string

    @Column({ type: "int" })
    level_id: number

    @Column()
    experience_points: number

    @Column()
    next_level_experience_points: number

    @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: "id"
    })
    user: User

    @ManyToOne(() => Race, (race) => race.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'race_id',
        referencedColumnName: "id"
    })
    race: Race

    @ManyToOne(() => Level, (level) => level.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'level_id',
        referencedColumnName: "id"
    })
    level: Level

    @ManyToOne(() => Class, (charcater_class) => charcater_class.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'class_id',
        referencedColumnName: "id"
    })
    class: Class

    @ManyToMany(() => Language)
    @JoinTable({
        name: "character_language",
        joinColumn: { name: "character_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "language_id", referencedColumnName: "id" }
    })
    languages: Language[]

    @OneToMany(() => CharacterCharacteristic, (character_characteristic) => character_characteristic.character)
    character_characteristic: CharacterCharacteristic[]

    @OneToMany(() => Equipment, (equipment) => equipment.character)
    equipment: Equipment[]

    @ManyToMany(() => Skill)
    @JoinTable({
        name: "character_skill",
        joinColumn: { name: "character_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "skill_id", referencedColumnName: "id" }
    })
    skills: Skill[]

    @OneToOne(() => Money, (money) => money.character)
    money: Money

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
