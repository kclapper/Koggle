module.exports = {
    extends: [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        "react/no-unescaped-entities": 0,
        "@typescript-eslint/no-floating-promises": 0
    }
  };