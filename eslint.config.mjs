import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  overrides: [
    {
      files: ["**/*.js"],
      parserOptions: {
        sourceType: "script",
      },
      languageOptions: { globals: { ...globals.browser, ...globals.node } },
      ...pluginJs.configs.recommended,
    },
  ],
};
