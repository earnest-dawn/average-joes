import environment from './network';
import { Outlet } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import  {CircularProgress } from '@mui/material';
import React, {Suspense} from 'react';

const { RelayEnvironmentProvider } = require('react-relay');

export default function App() {

    return (
        <RelayEnvironmentProvider environment={environment}>
            <Layout>
                <Suspense fallback={<CircularProgress />}>
                    <Outlet />
                </Suspense>
            </Layout>
        </RelayEnvironmentProvider>
    );
}
