import { Environment, Network, RecordSource, Store } from "relay-runtime";
import AuthService from "./utils/auth";

async function fetchQuery(operation, variables) {
  const token = AuthService.getToken();
  
  // Use the FULL URL to your Django backend
  // Without this, React tries to find /graphql/ on port 3000/3002
  const API_URL = "http://localhost:8000/graphql/"; 

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: operation.text, // This is what Django expects
      variables,
    }),
    credentials: "include",
  });

  // If you get a 404 here, your Django server isn't running or the URL is wrong
  if (!response.ok && response.status !== 400) {
    throw new Error(`Server fetch failed with status ${response.status}`);
  }

  const result = await response.json();

  if (response.status === 401) {
    AuthService.logout();
    throw new Error("Unauthorized: Please log in again.");
  }

  if (result.errors) {
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