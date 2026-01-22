// RelayEnvironment.js
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import AuthService from './utils/auth';
function fetchQuery(operation, variables) {
  const token = AuthService.getToken();

  return fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '', 
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;