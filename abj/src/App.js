import { Outlet } from 'react-router-dom';
import SearchAppBar from './components/inputs/NavbarInputs/NavbarInput';
import Footer from './components/Footer';
import BasicGrid from './pages/newPage';
// import './App.css';

export default function App() {
    return (
        <>
            <SearchAppBar />
            <BasicGrid />
            <Footer />
        </>
    );
}
