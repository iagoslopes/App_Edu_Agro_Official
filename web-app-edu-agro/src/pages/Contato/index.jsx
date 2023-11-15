import React, { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import './style.css';

//Função de criação do PopUp de mensagem
function AuthPopup({ open, message, onClose }) {
    const messageStyle = {
        fontSize: '18px',
    };

    const snackbarStyle = {
        zIndex: 99999,
        top: '9vh'
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000} // Define a duração que o pop-up ficará visível
            onClose={onClose}
            message={<span style={messageStyle}>{message}</span>}
            style={snackbarStyle}
        />
    );
}

export const Contato = () => {
    const [user, setUser] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [erros, setErros] = useState();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [descricao, setDescricao] = useState('');

    //Função para enviar as informações do contato para o banco de dados
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErros('Obrigado pelo seu feedback');
        setPopupOpen(true);

        try {
            const response = await axios.post('https://education-agro.onrender.com/contato', {
                nome,
                email,
                descricao,
            });

            console.log('Resposta da API:', response.data);
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error.message);
        }
        setNome('');
        setEmail('');
        setDescricao('');
    };

    //Função para fechar o PopUp com o tempo
    const handleClosePopup = () => {
        setPopupOpen(false);
    }

    //Função para verificar se existe usuário logado e se existir setar na variável setEmail e setUser
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                if (currentUser.emailVerified) {
                    setUser(currentUser);
                    setEmail(currentUser.email);
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
                <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />

                <div className='container-form'>
                    <div className='cont-form'>
                        <h2>Contate-nos</h2>
                        <div className="cat-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-name">
                                    <input
                                        className='cat-nome'
                                        type="text"
                                        placeholder='Nome'
                                        required
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                {user ? (
                                    <div className="campo-email">
                                        <div className="campo-opaco">
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="form-email">
                                        <input
                                            className='cat-email'
                                            type="email"
                                            placeholder='E-mail'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="form-textarea">
                                    <textarea
                                        className='cat-desc'
                                        cols="50"
                                        rows="10"
                                        wrap="hard"
                                        required
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                    />
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