import React from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import './style.css';

export const Sobre = () => {

    return (
        <>
            <Header />
            <div className="sobre-container">
                <p>Sobre</p>
                <span>Ainda vai ter alguma coisa aqui!</span>
            </div>
            <Footer />
        </>
    )
};