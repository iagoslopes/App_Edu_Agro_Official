import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import logo from '../../assets/img_logo.png';
import Snackbar from '@mui/material/Snackbar';
import './style.css';

//Função de criação do PopUp de mensagem
function AuthPopup({ open, message, onClose }) {
    const messageStyle = {
        fontSize: '18px',
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000} // Define a duração que o pop-up ficará visível
            onClose={onClose}
            message={<span style={messageStyle}>{message}</span>}
        />
    );
}

export const RecuperarSenha = () => {
    const [erros, setErros] = useState();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [email, setEmail] = useState('');

    //Função para fechar o PopUp com o tempo
    const handleClosePopup = () => {
        setPopupOpen(false);
    }

    //Função para o envio do e-mail de recuperação de senha
    function resetPassword() {
        setErros('Carregando...');
        setPopupOpen(true);

        sendPasswordResetEmail(auth, email)
            .then(resultado => {
                setErros('E-mail enviado');
                setPopupOpen(true);
            })
            .catch(erro => {
                if (erro.code === 'auth/missing-email') {
                    // Erro de credenciais
                    setErros('E-mail é obrigatório');
                    setPopupOpen(true);
                } else if (erro.code === 'auth/invalid-email') {
                    // Erro de credenciais
                    setErros('E-mail é inválido');
                    setPopupOpen(true);
                }
                else {
                    // Outros erros
                    setErros('Ocorreu um erro ao autenticar. Por favor, tente novamente mais tarde.');
                    setPopupOpen(true);
                }
            });
    }

    return (
        <div className="container">
            <div className='recuperar-container'>
                <header className="header">
                    <img src={logo} alt="Logo" />
                    <span>Recuperar Senha</span>
                </header>
                <div className="form-recuperar">
                    <form>
                        <div className="inputContainer">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type='button' onClick={resetPassword} className="button-recuperar" id='button'>
                            Enviar
                        </button>

                        <div className="footer">
                            <Link to="/login">Voltar</Link>
                        </div>
                    </form>
                </div>
            </div>
            <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />
        </div>
    );
}