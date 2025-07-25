const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer'); // NEW: For graceful shutdown
const http = require('http'); // NEW: Required for http server
const path = require('path');
const cors = require('cors'); // Already there, good.
const { json } = require('body-parser'); // NEW: For parsing JSON bodies, good practice with expressMiddleware

const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app); // NEW: Create an HTTP server for graceful shutdown

const startApolloServer = async () => {
    // Initialize ApolloServer with typeDefs, resolvers, and plugins
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // NEW: Add graceful shutdown plugin
    });

    await server.start(); // Start the Apollo Server instance

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json()); // Already there, good.

    // Apply CORS and JSON body parser before the GraphQL middleware
    app.use(cors()); // Already there, good.
    app.use(json()); // Already there, good. (or use express.json() which you already have)

    // Apply the Apollo Server Express middleware
    app.use(
        '/graphql',
        expressMiddleware(server, {
            // Correctly integrate authMiddleware into the context function
            context: async ({ req }) => {
                const authReq = authMiddleware({ req }); // Call your existing authMiddleware
                return { user: authReq.user }; // Return the user object for context
            },
        })
    );

    // if we're in production, serve client/dist as static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    // Connect to the database and then start the HTTP server
    db.once('open', () => {
        httpServer.listen(PORT, () => { // Use httpServer.listen for graceful shutdown
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloServer();
