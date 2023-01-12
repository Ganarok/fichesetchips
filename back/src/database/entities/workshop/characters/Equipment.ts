import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Character } from "./Character";
import { Item } from "./Item";

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    item_id: string

    @Column({ type: "uuid" })
    character_id: string

    @Column({ type: "boolean" })
    equiped: boolean

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string

    @ManyToOne(() => Item, (item) => item.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'item_id', referencedColumnName: "id" })
    item: Item

    @ManyToOne(() => Character, (character) => character.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'character_id', referencedColumnName: "id" })
    character: Character

}
