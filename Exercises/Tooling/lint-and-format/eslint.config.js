import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    {
        ignores: ['solution/**'],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        rules: {
            eqeqeq: 'error',
            'no-console': 'warn',
        },
    },

    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/quotes': ['error', 'double'],
        },
    },
]);
