const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const path = require("path");
const cors = require("cors");
const { json } = require("body-parser"); // Explicitly use body-parser
const { expressMiddleware } = require('@as-integrations/express5');

const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
    csrfPrevention: false, 
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApolloServer = async () => {
  await server.start();

  // Basic Express setup
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authReq = authMiddleware({ req });
        if (authReq.user) {
        console.log(`✅ Authenticated: ${authReq.user.username}`);
      } else {
        console.log("❌ No user found in context");
      }
        return { user: authReq.user };
      },
    })
  );

  // Fallback for rest of the app
  app.use(express.json());

  // Static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}!`);
      console.log(`🚀 GraphQL Sandbox: http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();