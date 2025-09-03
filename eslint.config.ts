import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const gitignore = fileURLToPath(new URL(".gitignore", import.meta.url));
const prettierignore = fileURLToPath(new URL(".prettierignore", import.meta.url));

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.node },
		rules: {
			"@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "always" }],
		},
	},
	tseslint.configs.recommended,
	includeIgnoreFile(gitignore),
	includeIgnoreFile(prettierignore),
]);
