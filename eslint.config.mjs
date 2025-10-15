import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { react: pluginReact },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    },
    settings: { react: { version: "detect" } },
  },
];
