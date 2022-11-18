import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Reports {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    reported: string;

    @Column({ unique: true })
    by: string;

    @Column()
    reason: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
