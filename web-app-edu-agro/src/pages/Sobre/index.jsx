import React from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import './style.css';

export const Sobre = () => {

    return (
        <>
            <Header />
            <div className="sobre-container">
                <div className="missao-container">
                    <div className="missao-imagem">
                    </div>
                    <div className="missao">
                        <p>Nossa Missão</p>
                        <span>Levar conhecimento do mundo agro para pessoas entusiastas</span>
                    </div>
                </div>
                <div className="espaco"></div>
                <div className="historia-container">
                    <div className="historia">
                        <p>Nossa História</p>
                        <span>Nosso projeto nasceu de um projeto interdisciplinar no 
                            intuito de elaborar um site e um aplicativo mobile
                        </span>
                    </div>
                    <div className="historia-imagem">
                    </div>
                </div>
                <div className="espaco"></div>
                <div className="feedback-container">
                    <div className="container-feed">
                        <h3>FeedBack</h3>
                        <div className="feedback">
                            <span>Seu feedback é importe para nós!<br>
                            </br>Se você tem algo para nos dizer não deixe para depois.
                                Uma recomendação, algo para melhorar, um bug, etc.<br>
                                </br>Agradecemos por nos visitar!
                            </span>
                        </div>
                        <div className="feedback-button">
                            <Link to='/contato'>ENVIAR</Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
};