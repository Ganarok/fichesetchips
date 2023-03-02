import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Characteristic } from "./Characteristic";
import { Race } from "./Race";

@Entity()
export class RaceCharacteristic {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    race_id: string

    @Column({ type: "uuid" })
    characteristic_id: string

    @Column()
    racial_bonus: number

    @ManyToOne(() => Race, (race) => race.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'race_id', referencedColumnName: "id" })
    race: Race

    @ManyToOne(() => Characteristic, (characteristic) => characteristic.id, { onDelete: "CASCADE", eager: true })
    @JoinColumn({ name: 'characteristic_id', referencedColumnName: "id" })
    characteristic: Characteristic
}
