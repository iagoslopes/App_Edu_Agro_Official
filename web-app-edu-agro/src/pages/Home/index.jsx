import React from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import CookiePopup from '../../components/Cookie';
import { FaGooglePlay } from 'react-icons/fa';
import './style.css';

export const Home = () => {

    return (
        <>
            <Header />
            <div className="home-container">
                <div className="app-info">
                    <h1>Bem-vindo ao Education Agro</h1>
                    <p>Explore o maravilhoso mundo das plantas com nosso aplicativo!</p>
                    <a href="#">
                        <div className="icon_user">
                            <FaGooglePlay size={32} />Disponível na Play Store
                        </div>
                    </a>
                </div>
            </div>
            <Footer />
            <CookiePopup />
        </>
    )
};