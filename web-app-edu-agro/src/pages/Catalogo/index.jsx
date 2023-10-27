import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';

export const Catalogo = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate('/login');
                return null;
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
                <p>
                    Welcome Catalogo
                </p>
            <Footer />
        </>
    )
};