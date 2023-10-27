import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { FaUser } from 'react-icons/fa';
import logo from '../../assets/img_logo.png';
import './style.css';

export default function Header() {
    const [active, setActive] = useState('nav_menu');
    const [toggleIcon, setToggleIcon] = useState('nav_toggler');
    const [user, setUser] = useState(null);

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
                setUser(currentUser);
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
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <Link to='/' className='nav_brand'>
                EducationAgro
            </Link>
            <div className="container">
                <ul className={active}>
                    <div className="item">
                        <li className="nav_item">
                            <Link to='/' className="nav_link">
                                Home
                            </Link>
                        </li>
                        <li className="nav_item">
                            <Link to='/catalogo' className="nav_link">
                                Catálogo
                            </Link>
                        </li>
                        <li className="nav_item">
                            <Link to='/sobre' className="nav_link">
                                Sobre
                            </Link>
                        </li>
                        <li className="nav_item">
                            <Link to='/contato' className="nav_link">
                                Contato
                            </Link>
                        </li>
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
                                    <FaUser size={32} />
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
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}