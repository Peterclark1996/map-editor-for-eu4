module.exports = {
    env: {
        "node": true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "react-hooks"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "react-hooks/exhaustive-deps": "warn"
    }
};