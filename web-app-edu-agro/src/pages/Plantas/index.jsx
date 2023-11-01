import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import './style.css';
import axios from "axios";

export const Plantas = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [post, setPost] = React.useState(null);

  React.useEffect(() => { }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                navigate('/login');
                return null;
            } else {
                setUser(null);
            }
        });

        axios.get("https://education-agro.onrender.com/plantas").then((response) => {
            setPost(response.data);
              console.log(response.data);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <Header />
            <div className="catalogo-container">
                Plantas
            </div>

            <Footer />
        </>
    )
};