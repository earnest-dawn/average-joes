import { Environment, Network, RecordSource, Store } from "relay-runtime";
import AuthService from "../utils/auth";

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  console.log("operation:", operation);
  console.log("variables:", variables);
  const token = AuthService.getToken();

  const headers = token
    ? {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "content-type": "application/json",
      };

  return fetch("/graphql", {
    method: "POST",
    headers: headers,
    credentials: "include",  // Include cookies for CSRF
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      return response.json().then((data) => {
        console.log("GraphQL Response:", data);
        if (!response.ok && !data.errors) {
          // Server error but no GraphQL errors - create one
          return {
            errors: [{ message: `Server error: ${response.status}` }],
          };
        }
        return data;
      });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error,
      );
      // Return a proper GraphQL error response
      return {
        errors: [{ message: error.message || "Failed to fetch" }],
      };
    });
}

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
});

export default environment;
