import React, { useState } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import './style.css';

//Import das imagens
import imagem1 from './Imagens/imagem1.jpeg';
import imagem2 from './Imagens/imagem2.jpeg';
import imagem3 from './Imagens/imagem3.jpeg';
import imagem4 from './Imagens/imagem4.jpeg';
import imagem5 from './Imagens/imagem5.jpg';
import imagem6 from './Imagens/imagem6.jpg';
import imagem7 from './Imagens/imagem7.jpeg';

export const Sobre = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);
    const imagens = [imagem5, imagem1, imagem2, imagem7];
    const imagens2 = [imagem6, imagem3, imagem4];

    //Função para voltar a imagem do carrossel no campo de imagem 'Missão'
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
    };

    //Função para avançar a imagem do carrossel no campo de imagem 'Missão'
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    };

    //Função para voltar a imagem do carrossel no campo de imagem 'História'
    const handlePrev2 = () => {
        setCurrentIndex2((prevIndex2) => (prevIndex2 - 1 + imagens2.length) % imagens2.length);
    };

    //Função para avançar a imagem do carrossel no campo de imagem 'História'
    const handleNext2 = () => {
        setCurrentIndex2((prevIndex2) => (prevIndex2 + 1) % imagens2.length);
    };

    return (
        <>
            <Header />
            <div className="sobre-container">
                <div className="missao-container">
                    <div className="missao-imagem">
                        <div className="carousel-container">
                            <div className="arrow arrow-left" onClick={handlePrev}>
                                &#8249;
                            </div>
                            <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {imagens.map((imagem, index) => (
                                    <img key={index} src={imagem} alt={`Imagem ${index + 1}`} />
                                ))}
                            </div>
                            <div className="arrow arrow-right" onClick={handleNext}>
                                &#8250;
                            </div>
                        </div>
                    </div>
                    <div className="missao">
                        <p>Nossa Missão</p>
                        <span><span>O</span> nosso objetivo é levar conhecimento de forma acessível para instruir entusiastas,
                            curiosos e estudantes sobre o mundo agro. Oferecemos um compêndio vasto com informações
                            de inúmeras espécimes para possibilitar o cultivo, independente de sua idade ou classe social.
                            Nossa filosofia é de que, alimentando a cultura do cultivo, podemos incentivar uma alimentação
                            mais saudável e também um hobby relaxante.
                        </span>
                    </div>
                </div>
                <div className="espaco"></div>
                <div className="historia-container">
                    <div className="historia-imagem">
                        <div className="carousel-container">
                            <div className="arrow arrow-left" onClick={handlePrev2}>
                                &#8249;
                            </div>
                            <div className="carousel" style={{ transform: `translateX(-${currentIndex2 * 100}%)` }}>
                                {imagens2.map((imagem, index) => (
                                    <img key={index} src={imagem} alt={`Imagem ${index + 1}`} />
                                ))}
                            </div>
                            <div className="arrow arrow-right" onClick={handleNext2}>
                                &#8250;
                            </div>
                        </div>
                    </div>
                    <div className="historia">
                        <p>Nossa História</p>
                        <span><span>O</span> Education Agro nasceu de um projeto interdisciplinar no intuito de elaborar um site e um
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