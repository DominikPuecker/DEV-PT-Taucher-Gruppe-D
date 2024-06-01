import pluginJs from 'plugin-js'; // Replace with actual plugin import
import globals from 'globals'; // Replace with actual globals import

export default {
  parserOptions: {
    sourceType: "script",
  },
  globals: {
    ...globals.browser,
    ...globals.node,
  },
  ...pluginJs.configs.recommended,
};
