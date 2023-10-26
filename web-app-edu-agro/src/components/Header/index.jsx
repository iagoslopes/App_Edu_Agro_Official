import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img_logo.png';
import './style.css';

export default function Header() {
    const [active, setActive] = useState('nav_menu');
    const [toggleIcon, setToggleIcon] = useState('nav_toggler');

    const navToggle = () => {
        active === 'nav_menu'
            ? setActive('nav_menu nav_active')
            : setActive('nav_menu');

        toggleIcon === 'nav_toggler'
            ? setToggleIcon('nav_toggler toggle')
            : setToggleIcon('nav_toggler');
        
    };

    return (
        <nav className="nav">
            <img src={logo} alt="Logo" className='logo'/>
            <Link to='' className='nav_brand'>
                EducationAgro
            </Link>
            <div className="container">
                <ul className={active}>
                    <div className="item">
                        <li className="nav_item">
                            <Link to='/home' className="nav_link">
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
                        <div className="user">
                            <div className="user_email">Email</div>
                            <button className="sign_out">
                                SignOut
                            </button>
                        </div>
                        <div className="icon_user">
                            Icon
                        </div>
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