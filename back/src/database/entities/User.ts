import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, AfterLoad } from "typeorm"
import { ROLE } from "../../utils/types/users";
import defaultUsers from "../fixtures/users"
import defaultPreferences from "../fixtures/preferences"
import { Preference } from "./Preference";
import { OnDeleteType } from "typeorm/metadata/types/OnDeleteType";

const defaultUser = defaultUsers.defaultUser
const defaultPreference = defaultPreferences.defaultPreference

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: defaultUser.avatar })
    avatar: string;

    @Column({
        type: "enum",
        default: defaultUser.role,
        enum: ["USER", "ADMIN", "SUPERADMIN"],
    })
    role: ROLE;

    @ManyToOne(() => Preference, (preference) => preference.id, { onDelete: ("SET DEFAULT" as OnDeleteType), onUpdate: "CASCADE", eager: true })
    @JoinColumn({
        name: 'preference_id',
        referencedColumnName: "id"
    })
    preference: Preference

    @Column({ type: "uuid", default: defaultPreference.id })
    preference_id: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    last_connection: string

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string
}
