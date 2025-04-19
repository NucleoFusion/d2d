// eslint.config.j// eslint.config.js
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import sveltePlugin from "eslint-plugin-svelte";

const svelte = sveltePlugin?.default || sveltePlugin;

export default [
  js.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: ["./server/tsconfig.json", "./client/tsconfig.json"],
        sourceType: "module",
      },
      globals: {
        console: true,
        process: true,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
    },
  },

  // Svelte-specific linting
  {
    files: ["client/**/*.svelte"],
    languageOptions: {
      parser: svelte?.parsers?.svelte,
    },
    plugins: {
      svelte,
    },
    processor: svelte?.processors?.svelte,
    rules: {
      "svelte/no-at-html-tags": "warn",
    },
  },
];
