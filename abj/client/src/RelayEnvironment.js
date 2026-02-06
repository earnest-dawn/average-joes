// RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import AuthService from "./utils/auth";

async function fetchQuery(operation, variables) {
  const token = AuthService.getToken();
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  const json = await response.json();
  console.log("Server Response:", json);

  return json;
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
