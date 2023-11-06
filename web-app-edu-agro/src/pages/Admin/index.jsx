import React, { useState, useEffect } from 'react';
import { auth } from '../../services/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            if (currentUser.emailVerified) {
            } else {
                navigate('/');
            }
          } else {
            navigate('/');
          }
        });
      
        return () => {
          unsubscribe();
        };
      }, []);
    

    return (
        <>
            <div className="admin-container">
                Admin
            </div>
        </>
    )
};