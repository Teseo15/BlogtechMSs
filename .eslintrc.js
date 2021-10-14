module.exports = {
  env: {
    node: true,
    es2021: true,
    es6: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
  },
};
