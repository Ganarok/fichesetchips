import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import { Item } from "./Item";

type DAMAGE_TYPE = "BLUDGEONING" | "PIERCING" | "SLASHING" | void
export const damageTypeEnum = ["BLUDGEONING", "PIERCING", "SLASHING", null]
@Entity()
export class ItemStat {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    item_id: string;

    @Column({ nullable: true })
    armor_class_base: number

    @Column({ nullable: true })
    armor_class_mod: string

    @Column({ nullable: true })
    min_strength: number

    @Column({ type: "boolean", nullable: true  })
    dexterity_disadvantage: boolean

    @Column({ nullable: true })
    damage_dice: number

    @Column({
        type: "enum",
        enum: damageTypeEnum,
        nullable: true
    })
    damage_type: DAMAGE_TYPE

    @Column({ type: "boolean", nullable: true  })
    melee: boolean

    @Column({ type: "boolean", nullable: true  })
    ranged: boolean

    @Column({ type: "boolean", nullable: true  })
    one_handed: boolean

    @Column({ type: "boolean", nullable: true  })
    two_handed: boolean

    @Column({ type: "boolean", nullable: true  })
    light: boolean

    @Column({ type: "boolean", nullable: true  })
    heavy: boolean

    @Column({ type: "boolean", nullable: true  })
    thrownd: boolean

    @Column({ type: "boolean", nullable: true  })
    ammunition: boolean

    @OneToOne(() => Item, (item) => item.id, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'item_id', referencedColumnName: "id" })
    item: Item
}