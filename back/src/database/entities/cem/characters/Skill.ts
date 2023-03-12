import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";
import { Calculation } from "./Calculation";
import { Characteristic } from "./Characteristic";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ type: "uuid" })
    characteristic_id: string

    @ManyToOne(() => Characteristic, (characteristic) => characteristic.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({
        name: 'characteristic_id',
        referencedColumnName: "id"
    })
    characteristic: Characteristic

    // NO NEED
    // @ManyToMany(() => Class)
    // @JoinTable({
    //     name: "class_skill",
    //     joinColumn: { name: "skill_id", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "class_id", referencedColumnName: "id" }
    // })
    // classes: Class[]
}
