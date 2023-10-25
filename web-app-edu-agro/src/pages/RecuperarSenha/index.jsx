import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import logo from '../../assets/img_logo.png';
import Snackbar from '@mui/material/Snackbar';
import './style.css';

function AuthPopup({ open, message, onClose }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000} // Define a duração que o pop-up ficará visível
            onClose={onClose}
            message={message}
        />
    );
}

export const RecuperarSenha = () => {
    const [erros, setErros] = useState();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [email, setEmail] = useState('');

    const handleClosePopup = () => {
        setPopupOpen(false);
    }

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
            <header className="header">
                <img src={logo} alt="Logo" />
                <span>Recuperar Senha</span>
            </header>

            <form>
                <div className="inputContainer">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type='button' onClick={resetPassword} className="button" id='button'>
                    Enviar
                </button>

                <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />

                <div className="footer">
                    <a href="/">Voltar</a>
                </div>
            </form>
        </div>
    );
}