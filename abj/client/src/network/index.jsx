import { Environment, Network, RecordSource, Store, error } from "relay-runtime";
import AuthService from "../utils/auth";

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  console.log("operation:", operation);
  console.log("variables:", variables);
  const token = AuthService.getToken();

  // If there's no token, don't set the Authorization header
  const headers = token
    ? {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "content-type": "application/json",
      };

  return fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Fetch error:", error);
        return { errors: [{ message: error.message }] };
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error,
      );
    });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
  // ... other options
});

export default environment;
