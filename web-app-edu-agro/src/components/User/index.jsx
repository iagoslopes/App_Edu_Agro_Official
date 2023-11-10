import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import './user.css';

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

const ConfiguracoesUsuario = ({ userEmail, onClose }) => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [erros, setErros] = useState();
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [emails, setEmails] = useState('');
    const [senhas, setSenhas] = useState('');

    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                // Verifique se existe um documento no Firestore para o usuário atual
                const userDocRef = doc(db, 'users', userEmail);

                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    // Se o documento existir, preencha os campos com os dados do Firestore
                    const userData = userDocSnap.data();
                    setNome(userData.nome || '');
                    setDataNascimento(userData.dataNascimento || '');
                    setSexo(userData.sexo || '');
                }
            } catch (error) {
                setErros(error);
                setPopupOpen(true);
            }
        };

        // Carregue as informações do usuário ao abrir o modal
        loadUserInfo();
    }, [userEmail]); // Execute novamente se o email do usuário mudar

    const handleSalvar = async (e) => {
        e.preventDefault();

        try {
            // Crie ou atualize o documento no Firestore com as informações do usuário
            const userDocRef = doc(db, 'users', userEmail);
            const userDocSnap = await getDoc(userDocRef);

            const userData = {
                nome,
                dataNascimento,
                sexo,
            };

            if (userDocSnap.exists()) {
                // Documento existe, atualize
                await updateDoc(userDocRef, { nome, dataNascimento, sexo });
            } else {
                // Documento não existe, crie
                await setDoc(userDocRef, { nome, dataNascimento, sexo });
            }

            // Feche o modal após salvar/atualizar
            onClose();
        } catch (error) {
            setErros(error);
            setPopupOpen(true);
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleEntrar = () => {
        if (emails === 'admin' && senhas === 'admin') {
            // Redireciona para a página de admin
            navigate('/admin');
        } else {
            // Lógica para lidar com credenciais incorretas, como exibir uma mensagem de erro
            // ou realizar outras ações necessárias
        }
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    }

    return (
        <div className="configuracoes-modal">

            <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />

            <div className="configurações-admin" onClick={openModal}>
                Admin
            </div>

            <div className="configuracoes-usuario-modal">

                <div className="button-fechar-modal">
                    <button
                        className="fechar-modal"
                        onClick={onClose}>
                        Fechar
                    </button>
                </div>

                <h2>Configurações do Usuário</h2>

                <form onSubmit={handleSalvar}>
                    <label>Nome Completo:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <div className="campo-email">
                        <label>E-mail:</label>
                        <div className="campo-opaco">
                            <span>{userEmail}</span>
                        </div>
                    </div>

                    <label>Data de Nascimento:</label>
                    <input
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />

                    <label>Sexo:</label>
                    <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                    </select>

                    <button
                        type="submit">
                        Salvar
                    </button>

                </form>
            </div>

            {showModal && (
                <div className="modal-admin">
                    <div className="modal-admin-content">
                        <div className='modal-admin-close'>
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                        <div className='modal-admin-container'>
                            <p className='title-modal-admin'>Painel Admin</p>

                            <div className='modal-admin-email'>
                                <input
                                    placeholder='E-mail'
                                    type="email"
                                    value={emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                />
                            </div>

                            <div className='modal-admin-senha'>
                                <input
                                    placeholder='Senha'
                                    type="password"
                                    value={senhas}
                                    onChange={(e) => setSenhas(e.target.value)}
                                />
                            </div>

                            <div className='modal-admin-entrar'>
                                <button onClick={handleEntrar}>Entrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ConfiguracoesUsuario;