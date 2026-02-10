const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const secret = "mysecretsshhhhh";
const expiration = "2h";

class AuthenticationError extends GraphQLError {
  constructor(message = "Could not authenticate user.") {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
    this.name = "AuthenticationError";
  }
}

module.exports = {
  AuthenticationError,
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    console.log("--- Auth Debug ---");
    console.log("Raw Header:", req.headers.authorization);
    console.log("Extracted Token:", token);
    if (!token) {
      return req;
      console.log("No token found in request");
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
