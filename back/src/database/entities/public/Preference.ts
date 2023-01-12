import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"
import defaultPreferences from "../../fixtures/preferences"
import { LANGUAGES, THEMES } from "../../../utils/types/preferences";

const defaultPreference = defaultPreferences.defaultPreference

@Entity()
@Unique(['theme', 'language'])
export class Preference {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        default: defaultPreference.theme,
        enum: ["DEFAULT", "DARK"],
    })
    theme: THEMES;

    @Column({
        type: "enum",
        default: defaultPreference.language,
        enum: ["FRENCH", "ENGLISH"],
    })
    language: LANGUAGES;

    @CreateDateColumn({ type: "timestamp" })
    created_at: string

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: string


}
