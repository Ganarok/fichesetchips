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
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    server: {
        port: 8000,
    },

    router: {
        middleware: 'index',
    },

    loading: {
        color: '#FFDB57',
        height: '4px',
    },

    // Define the development or production mode of Nuxt
    dev: process.env.NODE_ENV !== 'production' || 'development',

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
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },

    watchers: {
        webpack: {
            poll: true,
        },
    },
}
