import en from './locales/en.json'
import fr from './locales/fr.json'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Fiches&Chips',
        htmlAttrs: {
            lang: 'fr',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Fiches&Chips Project',
            },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
    },

    server: {
        port: process.env.PORT || 8000,
    },

    router: {
        middleware: 'index',
    },

    loading: {
        color: '#4FEA74',
        height: '3px',
        throttle: 0,
    },

    // Define the development or production mode of Nuxt
    dev: process.env.NODE_ENV === 'dev',

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/main.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxt/postcss8',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/i18n', '@nuxtjs/toast'],

    i18n: {
        locales: ['fr', 'en'],
        defaultLocale: 'fr',
        vueI18n: {
            fallbackLocale: 'fr',
            messages: {
                en,
                fr,
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },

    tailwindcss: {
        viewer: false,
    },

    watchers: {
        webpack: {
            poll: true,
        },
    },
}
