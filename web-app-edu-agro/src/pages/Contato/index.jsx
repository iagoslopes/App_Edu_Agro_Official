import React, { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import './style.css';

export const Contato = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                if (currentUser.emailVerified) {
                    setUser(currentUser);
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <Header />

            <section className='section-cat'>

                <div className="contato-container"></div>

                <div className='container-form'>
                    <div className='cont-form'>
                        <h2>Contate-nos</h2>
                        <div className="cat-form">
                            <form>
                                <div className="form-name">
                                    <input className='cat-nome' type="text" placeholder='Nome' />
                                </div>
                                {user ? (
                                    <div className="campo-email">
                                        <div className="campo-opaco">
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="form-email">
                                        <input className='cat-email' type="email" placeholder='E-mail' />
                                    </div>
                                )}
                                <div className="form-textarea">
                                    <textarea className='cat-desc' cols="50" rows="10" wrap="hard"></textarea>
                                </div>
                                <div className="form-button">
                                    <button className='cat-btn'>Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='container-infos'>
                    <div className='cont-telefone'>
                        <div className="telefone">
                            <h5 className='title-tel'>Ligue para nós</h5>
                            <p className='tel'>+55 (11)9 63534341</p>
                        </div>
                    </div>
                    <div className="cont-email">
                        <div className="mail">
                            <h5 className='title-email'>E-mail para contato</h5>
                            <p className='desc-email'>educationagro-contato@gmail.com</p>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />
        </>
    )
};