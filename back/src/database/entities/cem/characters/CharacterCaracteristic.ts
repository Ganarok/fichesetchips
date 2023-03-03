import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Characteristic } from "./Characteristic";
import { Character } from "./Character";
import { Race } from "./Race";

@Entity()
export class CharacterCharacteristic {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    character_id: string

    @Column({ type: "uuid" })
    characteristic_id: string

    @Column()
    value: number

    @ManyToOne(() => Character, (character) => character.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'character_id', referencedColumnName: "id" })
    character: Character

    @ManyToOne(() => Characteristic, (characteristic) => characteristic.id, { onDelete: "CASCADE", eager: true })
    @JoinColumn({ name: 'characteristic_id', referencedColumnName: "id" })
    characteristic: Characteristic
}
