import React from 'react';
import Header from "../../components/Header"
import {  signOut } from "firebase/auth";
import { auth } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
    
    return (
        <>
            <nav>
            <Header />
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
        </>
    )
};