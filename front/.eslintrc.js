module.exports = {
    env: {
        "browser": true,
        "es2021": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        'plugin:vue/vue3-recommended',
        "prettier"
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "vue"
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off',
        'no-unused-vars': 'warn',
        'vue/no-deprecated-v-on-native-modifier': 'off'
    }
}