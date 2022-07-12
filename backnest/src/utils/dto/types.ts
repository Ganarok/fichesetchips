export type ROLE = "USER" | "ADMIN"
export type LANGUAGES = "FRENCH" | "ENGLISH"
export type THEMES = "DEFAULT" | "DARK"
export type PreferenceType = {
    theme: THEMES,
    language: LANGUAGES
}
export type UserType = {
    username: string,
    password: string,
    avatar: string,
    role: ROLE,
    preference_id: number
}