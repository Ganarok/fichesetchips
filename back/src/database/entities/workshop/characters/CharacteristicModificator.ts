import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"

@Entity()
export class CharacteristicModificator {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    characteristic_value: number

    @Column()
    modificator_value: number
}
