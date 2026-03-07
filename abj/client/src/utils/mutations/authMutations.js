import { graphql } from "babel-plugin-relay/macro";

/**
 * Mutation to register a new user
 * Returns authentication token and user object
 */
export const REGISTER = graphql`
  mutation authMutationsRegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

/**
 * Mutation to login a user
 * Returns authentication token and user object
 */
export const LOGIN = graphql`
  mutation authMutationsLoginMutation($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

/**
 * Query to get current authenticated user
 * Returns null if not authenticated
 */
export const GET_ME = graphql`
  query authMutationsGetMeQuery {
    me {
      id
      username
      email
      avatar
      bio
      role
    }
  }
`;
