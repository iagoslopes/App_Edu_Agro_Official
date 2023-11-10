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
                        <span>O nosso objetivo é levar conhecimento de forma acessível para instruir entusiastas, 
                            curiosos e estudantes sobre o mundo agro. Oferecemos um compêndio vasto com informações 
                            de inúmeras espécimes para possibilitar o cultivo, independente de sua idade ou classe social. 
                            Nossa filosofia é de que, alimentando a cultura do cultivo, podemos incentivar uma alimentação 
                            mais saudável e também um hobby relaxante.</span>
                    </div>
                </div>
                <div className="espaco"></div>
                <div className="historia-container">
                    <div className="historia-imagem">
                    </div>
                    <div className="historia">
                        <p>Nossa História</p>
                        <span>O Education Agro nasceu de um projeto interdisciplinar no intuito de elaborar um site e um 
                            aplicativo mobile. Um tema recorrente durante nossos estudos foi a aplicação da tecnologia 
                            na agricultura, então nos surgiu uma ideia: desenvolver uma biblioteca pública e gratuita com 
                            todas as informações necessárias para cultivar as mais diversas flores, raízes, vegetais, legumes e mais.
                        </span>
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