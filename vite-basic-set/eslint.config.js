import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
/**
 * ESLint config customized:
 * - Softens select DX-related rules (see assistant-prefs/README.md)
 * - Relies on TypeScript (noUnusedLocals/Parameters) for hard unused errors
 * - ESLint side gives guidance + documented exceptions
 */
export default tseslint.config([
  globalIgnores(["dist"]),
  // Base rule set (all TS/React files)
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // TS already errors on true unused locals; ESLint here is advisory + allows _ prefix
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Allow inference for most functions/components (return types enforced only if needed elsewhere)
      "@typescript-eslint/explicit-function-return-type": "off",
      // Prototype speed: surface but don't block
      "@typescript-eslint/no-explicit-any": "off",
      // Encourage documented suppressions
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          minimumDescriptionLength: 5,
        },
      ],
      // Non-blocking cognitive complexity feedback
      complexity: ["warn", { max: 12 }],
    },
  },
  // Pages layer: allow more narrative / verbose content
  {
    files: ["src/pages/**/*.{ts,tsx}"],
    rules: {
      complexity: "off",
    },
  },
]);
