import React from 'react';
import Footer from '../Footer';
import Header from '../Navbar';
import SearchAppBar from '../inputs/NavbarInputs/NavbarInput';
import AuthService from '../../utils/auth';
import Navbar from '../Navbar';
const Layout = ({ children }) => {
    if (AuthService.loggedIn()) {
        return (
            <>
                <SearchAppBar />
                <div id="wholeLayout">
                    <div>{children}</div>
                </div>
                <Footer />
            </>
        );
    }
    return (
        <>
            <Navbar />
            <div id="wholeLayout">
                <div>{children}</div>
            </div>

            <Footer />
        </>
    );
};

export default Layout;
