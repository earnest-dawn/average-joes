module.exports = {
  src: "./client/src",
  schema: "./schema.graphql",
  language: "javascript",
  eagerEsModules: true,
  exclude: [
    "**/AdminPages/**",
    "**/LoginPage/**",
    "**/RegistrationPage/**",
    "**/SearchPage/**",
    "**/LocationPage/**",
    "**/node_modules/**",
    "**/__mocks__/**",
    "**/__generated__/**"
  ],
};
    