import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import CookiePopup from '../../components/Cookie';
import { FaGooglePlay } from 'react-icons/fa';

import hill01 from './Parallax/hill1.png';
import hill02 from './Parallax/hill2.png';
import hill03 from './Parallax/hill3.png';
import hill04 from './Parallax/hill4.png';
import hill05 from './Parallax/hill5.png';
import tree0 from './Parallax/tree.png';
import leaf0 from './Parallax/leaf.png';
import plant0 from './Parallax/plant.png';
import celular from './Imagens/Celular.png';

import './style.css';

export const Home = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header />

            <section className='parallax'>
                <img src={hill01} id='hill1'
                    style={{ transform: `translateY(${offsetY * 0.5}px)` }}
                />
                <img src={hill02} id='hill2' />
                <img src={hill03} id='hill3' />
                <img src={hill04} id='hill4'
                    style={{ transform: `translateX(${offsetY * -0.5}px)` }}
                />
                <img src={hill05} id='hill5'
                    style={{ transform: `translateX(${offsetY * 0.5}px)` }}
                />
                <img src={tree0} id='tree' />
                <h2 id='text'
                    style={{ transform: `translateY(${offsetY * 0.5}px)` }}
                >Education Agro</h2>
                <img src={leaf0} id='leaf'
                    style={{ transform: `translateY(${offsetY * -1.5}px) translateX(${offsetY * 0.5}px)` }}
                />
                <img src={plant0} id='plant' />
            </section>

            <section className='sec'>
                <div className="home-container">
                    <div className="app-info">
                        <h1>Bem-vindo ao Education Agro</h1>
                        <p>Explore o maravilhoso mundo das plantas com nosso aplicativo!</p>
                        <a href="#">
                            <div className="icon_user">
                                <FaGooglePlay size={48} color='black'/>Disponível na Play Store
                            </div>
                        </a>
                    </div>
                    <div className="celular">
                        <img src={celular} id='celular'
                         />
                    </div>
                </div>
            </section>

            <Footer />
            <CookiePopup />
        </>
    )
};