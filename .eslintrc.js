module.exports = {
  env: {
    browser: true,
    es6: true,
    amd: true,
    node: true,
    commonjs: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "google",
    "prettier",
  ],
  plugins: ["react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "require-jsdoc": 0,
    "sort-imports": 1,
  },
  settings: {
    react: {
      // Regex for Component Factory to use, default to "createReactClass"
      createClass: "createReactClass",
      // Pragma to use, default to "React"
      pragma: "React",
      // React version. "detect" automatically picks the version you have installed.
      version: "detect",
      flowVersion: "0.53", // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g.
      // `forbidExtraProps`. If this isn't set, any propTypes wrapped in a
      // function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
  },
};
