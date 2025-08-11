import { defineConfig } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends("eslint:recommended", "plugin:import/recommended")),

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },
    },

    rules: {
        "no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],
    },
}]);