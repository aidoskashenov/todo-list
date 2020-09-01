module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": [2, { ignore: ["db"] }],
  },
}
