import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Class } from "./Class";
import { Skill } from "./Skill";

type NAME = "STRENGTH" | "DEXTERITY" | "CONSTITUTION" | "INTELLIGENCE" | "WISDOM" | "CHARISMA"
export const characteristicsEnum = ["STRENGTH", "DEXTERITY", "CONSTITUTION", "INTELLIGENCE", "WISDOM", "CHARISMA"]
@Entity()
export class Characteristic {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: characteristicsEnum,
        unique: true
    })
    name: NAME;
    
    @OneToMany(() => Skill, (skill) => skill.characteristic, { onDelete: "CASCADE" })
    skill: Skill[]
    // NO NEED
    // @ManyToMany(() => Class)
    // @JoinTable({
    //     name: "saving_thrown",
    //     joinColumn: { name: "characteristic_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "class_id", referencedColumnName: "id" }
    // })
    // classes: Class[]


}
