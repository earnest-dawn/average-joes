import { Outlet } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import React from 'react';

const {
    Store,
    RecordSource,
    Environment,
    Network,
    Observable,
} = require('relay-runtime');

const { RelayEnvironmentProvider } = require('react-relay');

/**
 *
 * Custom fetch function to handle GraphQL requests for a Relay environment.
 *
 * This function is responsible for sending GraphQL requests over the network and returning
 * the response data. It can be customized to integrate with different network libraries or
 * to add authentication headers as needed.
 *
 * @param {RequestParameters} params - The GraphQL request parameters to send to the server.
 * @param {Variables} variables - Variables used in the GraphQL query.
 */
function fetchFunction(params, variables) {
    const response = fetch('http://my-graphql/api', {
        method: 'POST',
        headers: [['Content-Type', 'application/json']],
        body: JSON.stringify({
            query: params.text,
            variables,
        }),
    });
    function fetchQuery(operation, variables, cacheConfig, uploadables) {
        return fetch('/graphql', {
            method: 'POST',
            headers: {
                // Add authentication and other headers here
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: operation.text, // GraphQL text from input
                variables,
            }),
        }).then((response) => {
            return response.json();
        });
    }
    return Observable.from(response.then((data) => data.json()));
}

/**
 * Creates a new Relay environment instance for managing (fetching, storing) GraphQL data.
 */
function createEnvironment() {
    const network = Network.create(fetchFunction);
    const store = new Store(new RecordSource());
    return new Environment({ store, network });
}

const environment = createEnvironment();

export default function App() {
    return (
        <RelayEnvironmentProvider environment={environment}>
            <Layout>
                <Outlet />
            </Layout>
        </RelayEnvironmentProvider>
    );
}
