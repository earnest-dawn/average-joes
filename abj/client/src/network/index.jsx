import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables, cacheConfig, uploadables) {
    console.log('operation:', operation);
    console.log('variables:', variables);
    return fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
            // Add authentication and other headers here
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text, // GraphQL text from input
            variables,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch((error) => {
            console.error(
                'There has been a problem with your fetch operation: ',
                error
            );
        });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment1 = new Environment({
    network,
    store,
    // ... other options
});

export default environment1;
