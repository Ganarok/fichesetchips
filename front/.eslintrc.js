module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-recommended",
        // "prettier",
        // "@vue/prettier",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
        "vue/attribute-hyphenation": ["off"],
        "vue/html-self-closing": ["off"],
        "vue/multi-word-component-names": "off",
        "vue/no-reserved-component-names": "off",
        "no-unused-vars": "warn",
        "vue/no-unused-components": "warn",
        "vue/no-deprecated-v-on-native-modifier": "off",
        "indent": ["warn", 4],
        "semi": ["warn", "never"],
        "vue/html-indent": ["warn", 4],
        "vue/prop-name-casing": "off"
    },
}