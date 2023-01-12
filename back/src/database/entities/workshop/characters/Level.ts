import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Character } from "./Character";

@Entity()
export class Level {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column()
    experience_points: number

    @Column()
    proficiency_bonus: number

    @OneToMany(() => Character, (character) => character.id, { onDelete: "CASCADE" })
    @JoinColumn({
        name: 'character_id',
        referencedColumnName: "id"
    })
    character: Character
}
