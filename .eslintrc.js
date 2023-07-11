module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    ignorePatterns: [
        '**/dist/*'
    ],
    root: true,
    env: {
      node: true
    },
    rules: {
      "semi": "off",
      "@typescript-eslint/semi": ["error", "never"],
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/member-delimiter-style": ["error", {multiline: {delimiter: "none"}, singleline:{delimiter: "semi", "requireLast": true}}],
      "@typescript-eslint/no-namespace": "off",
      "quotes": "off",
      "@typescript-eslint/quotes": ["error", "double"]
    },
  };