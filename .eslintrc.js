module.exports = {
  root: true,
  env: {
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  ignorePatterns: ["**/*.js", "**/*.d.ts"],
  plugins: ["promise", "@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:promise/recommended",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb/hooks",
    "prettier/react"
  ],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }],
    "react/react-in-jsx-scope": "off", // [Next.js] we don't have to import React explicitly
    "react/prefer-stateless-function": [2, { ignorePureComponents: false }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function"
      }
    ],
    // defaultProps are deprecated for functional components (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md)
    "react/require-default-props": [2, { ignoreFunctionalComponents: true }],
    "react/jsx-props-no-spreading": "off",
    "no-void": [2, { allowAsStatement: true }]
  },
  overrides: [
    // Specific rules for TSX only
    {
      files: ["*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/display-name": "off"
      }
    },
    // Specific rules for Next.js pages and api routes only
    {
      files: ["src/pages/**/*.tsx", "src/pages/api/**/*.ts"],
      rules: {
        "import/no-default-export": "off"
      }
    }
  ],
  globals: {
    React: "writable" // [Next.js] we don't have to import React explicitly
  }
};
