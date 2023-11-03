import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import BasicGrid from './pages/newPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// import './App.css';

export default function App() {
    return (
        <>
            <Outlet />
        </>
    );
}
