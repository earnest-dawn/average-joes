import environment1 from './network';
import { Outlet } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import React from 'react';

const { RelayEnvironmentProvider } = require('react-relay');

export default function App() {
    return (
        <RelayEnvironmentProvider environment={environment1}>
            <Layout>
                <Outlet />
            </Layout>
        </RelayEnvironmentProvider>
    );
}
