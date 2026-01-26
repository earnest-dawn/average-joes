    // relay.config.js in your root (abj) directory
    module.exports = {
      // The directory where Relay will search for GraphQL files
      src: "./client/src",
      // The path to your GraphQL schema file
      schema: "./server/schemas/app_schema.graphql",
      language: "javascript",
exclude: ["**/AdminPageOptionsInputs.jsx", "**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
    };
    