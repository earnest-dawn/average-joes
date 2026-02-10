// RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import AuthService from "./utils/auth";

async function fetchQuery(operation, variables) {
  const token = AuthService.getToken();
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  const result = await response.json();

  if (response.status === 401) {
    console.error("Session expired or unauthorized. Logging out...");
    // Auth.logout(); // Optional: redirect user to login
    throw new Error("Unauthorized: Please log in again.");
  }

  if (result.errors) {
    // Log the actual server error message (e.g., "User not found")
    console.error("GraphQL Errors:", result.errors);
    throw new Error(result.errors[0]?.message || "GraphQL Error");
  }

  return result;
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;