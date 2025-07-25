    // relay.config.js in your root (abj) directory
    module.exports = {
      // The directory where Relay will search for GraphQL files
      src: "./client/src",
      // The path to your GraphQL schema file
      schema: "./server/schemas/app_schema.graphql",
      // The directory where Relay will output generated files
      artifactDirectory: "./client/src/__generated__", // This is important for client imports
      // The language for the generated files (e.g., 'javascript', 'typescript')
      language: "javascript",
      // Optional: If you have a specific Relay environment setup file
      // You might need to adjust this if your environment is in a different place
      // or if you have specific directives.
      // For most cases, the above is enough.
      // See Relay docs for more advanced options: https://relay.dev/docs/guides/compiler-config/
    };
    