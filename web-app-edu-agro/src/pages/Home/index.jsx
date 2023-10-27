import React from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import CookiePopup from '../../components/Cookie';

export const Home = () => {
    
    return (
        <>
            <Header />
            <CookiePopup />
                <p>
                    Welcome Home
                </p>
            <Footer />
        </>
    )
};