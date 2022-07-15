export type LANGUAGES = "FRENCH" | "ENGLISH"
export type THEMES = "DEFAULT" | "DARK"

export type PreferenceType = {
    theme: THEMES,
    language: LANGUAGES
}

export const preferences = [
    {
        theme: "DEFAULT",
        language: "FRENCH"
    }, {
        theme: "DARK",
        language: "FRENCH"
    }, {
        theme: "DEFAULT",
        language: "ENGLISH"
    }]

export const defaultPreference = {
    theme: "DEFAULT",
    language: "FRENCH"
}