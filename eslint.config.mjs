import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
    {
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            eslintReact.configs["recommended-typescript"],
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser
        },
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            // General rules
            'semi': 'warn',
            'no-console': 'warn',
            'no-alert': 'error',
            'quotes': ['warn', 'single'],
            'max-len': ['warn', {
                'code': 120,
                'ignoreComments': true,
                'ignoreRegExpLiterals': true,
            }],
            "eol-last": "warn",

            // TypeScript rules
            "@typescript-eslint/no-inferrable-types": 'warn',
            "@typescript-eslint/no-explicit-any": 'warn',
            "@typescript-eslint/no-unused-vars": 'warn',
        },
    },
    globalIgnores(['dist'])
])