const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');

module.exports = [
    // Base configuration for all files
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            // Extend recommended TypeScript ESLint rules
            ...tseslint.configs.recommended.rules,
            // Disable no-unused-vars rule
            '@typescript-eslint/no-unused-vars': 'off',
            '@/quotes': ['error', 'double'],
            '@/indent': ['error', 4, {
                SwitchCase: 1,
                VariableDeclarator: 1
            }],
            '@/semi': ['error', 'always'],
            // Add any additional rules here later
        },
    },
    // Ignore node_modules and artifacts
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'cdk.out/**',
            '*.js',
            '*.mjs',
        ],
    },
];
