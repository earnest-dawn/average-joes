const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql'); // Import GraphQLError to extend it
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Define AuthenticationError as a class that extends GraphQLError
class AuthenticationError extends GraphQLError {
    constructor(message = 'Could not authenticate user.') { // Allow custom messages
        super(message, {
            extensions: {
                code: 'UNAUTHENTICATED',
            },
        });
        this.name = 'AuthenticationError'; // Set the name of the error
    }
}

module.exports = {
    AuthenticationError, // Export the class itself, not an instance
    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token =
            req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
            // If you want to throw an error here for invalid token, use the class:
            // throw new AuthenticationError('Invalid token provided.');
        }

        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
