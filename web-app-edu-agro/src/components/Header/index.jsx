import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { FaUser } from 'react-icons/fa';
import logo from '../../assets/img_logo.png';
import './style.css';

export default function Header() {
    const navigate = useNavigate();
    const [active, setActive] = useState('nav_menu');
    const [toggleIcon, setToggleIcon] = useState('nav_toggler');
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [emails, setEmails] = useState();
    const [senhas, setSenhas] = useState();

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

    const navToggle = () => {
        active === 'nav_menu'
            ? setActive('nav_menu nav_active')
            : setActive('nav_menu');

        toggleIcon === 'nav_toggler'
            ? setToggleIcon('nav_toggler toggle')
            : setToggleIcon('nav_toggler');

    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log('Usuário desconectado com sucesso.');
        } catch (error) {
            console.error('Erro ao desconectar o usuário:', error);
        }
    };

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
        <nav className="nav">
            <Link to="/" className="logo">
                <img src={logo} alt="Logo" width={95} className="img" />
            </Link>
            <Link to='/' className='nav_brand'>
                EducationAgro
            </Link>
            <div className="container-header">
                <ul className={active}>
                    <div className="item">
                        <li className="nav_item">
                            <NavLink to='/' className="nav_link">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to='/catalogo' className="nav_link">
                                Catálogo
                            </NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to='/sobre' className="nav_link">
                                Sobre
                            </NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to='/contato' className="nav_link">
                                Contato
                            </NavLink>
                        </li>
                    </div>
                    <div className="user_container2">
                        {user ? (
                            <div className='nav_user'>
                                <div className="user">
                                    <p>{user.email}</p>
                                    <button onClick={handleSignOut} className="sign_out">
                                        SignOut
                                    </button>
                                </div>
                                <div className="icon_user">
                                <Link onClick={openModal}><FaUser size={32} /></Link>
                                </div>
                            </div>
                        ) : (
                            <div className='btn_not_user'>
                                <Link className='botao_login' to="/login">Login</Link>
                                <Link className='botao_register' to="/register">Cadastre-se</Link>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
            <div className="user_container">
                {user ? (
                    <div className='nav_user'>
                        <div className="user">
                            <p>{user.email}</p>
                            <button onClick={handleSignOut} className="sign_out">
                                SignOut
                            </button>
                        </div>
                        <div className="icon_user">
                            <Link onClick={openModal}><FaUser size={32} /></Link>
                        </div>
                    </div>
                ) : (
                    <div className='btn_not_user'>
                        <Link className='botao_login' to="/login">Login</Link>
                        <Link className='botao_register' to="/register">Cadastre-se</Link>
                    </div>
                )}
            </div>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>

            {showModal && (
                <div className="modal-admin">
                    <div className="modal-admin-content">
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
                        <div className='modal-admin-close'>
                            <button onClick={closeModal}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}

        </nav>
    );
}