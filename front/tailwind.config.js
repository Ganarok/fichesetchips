module.exports = {
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    content: [
        './components/*.{js,vue,ts}',
        './layouts/*.vue',
        './pages/*.vue',
        './plugins/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'fiche-green': '#4FEA74',
                'chips-yellow': '#FFDB57',
            },
        },
    },
    plugins: [],
}
