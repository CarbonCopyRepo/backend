module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:prettier/recommended", "prettier", "eslint:recommended"],
  plugins: ["@typescript-eslint", "jest"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    project: "tsconfig.json",
  },
  env: {
    es6: true,
    node: true,
    "jest/globals": true,
  },
  // Rules can be configured as required
  // List available at - https://eslint.org/docs/latest/rules/
  rules: {
    "no-var": "error",
    semi: "error",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
  },
};
