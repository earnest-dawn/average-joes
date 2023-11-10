import { Outlet } from 'react-router-dom';

import './App.css';
import CustomizedRating from './components/inputs/RatingsInputs/RatingInputs';
import Layout from './components/Layout';

export default function App() {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
}
