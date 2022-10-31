import { createI18n } from 'vue-i18n'
import fr from './fr.json'
import en from './en.json'

const defaultLocale = 'fr'
const languages = { fr, en }
const CustomI18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: Object.assign(languages)
})

export default CustomI18n
