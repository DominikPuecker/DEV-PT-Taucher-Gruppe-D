import eslintPluginJs from '@stylistic/eslint-plugin-js';
import globals from 'globals'; // Ensure 'globals' is installed and imported correctly

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        sourceType: "script",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ...eslintPluginJs.configs.recommended,
  },
];