/** @type {import('tailwindcss').Config} */

const customColors = {
    'fc-green': '#4FEA74',
    'fc-yellow': '#FFDB57',
    'fc-yellow-trans': '#FFDB57b3',
    'fc-black': '#1E1E1E',
    'fc-black-light': '#353535',
    'fc-red': '#F04E4E',
}

const parseColors = () => {
    let parsedColors = []
    const colors = Object.keys(customColors)

    colors.map(color => {
        parsedColors.push('bg-'+color)
        parsedColors.push('text-'+color)
        parsedColors.push('border-'+color)
        parsedColors.push('outline-'+color)
    })

    return parsedColors
}

module.exports = {
    mode: 'jit',
    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    safelist: parseColors(),
    theme: {
        extend: {
            colors: customColors,
            fontFamily: {
                barlow: ['Barlow', 'sans-serif'],
            },
            screens: {
                tablet: { max: '1414px' },
                grid1Col: { max: '957px' },
                mobile: { max: '600px' },
                mobileSup: { min: '601px' },
            },
        },
    },
    plugins: [],
}

