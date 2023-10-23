import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../assets/img_logo.png';
import { auth } from '../../services/firebaseConfig';
import './style.css';

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email,password);
  }

  if(user) {
    return (
      <Navigate to='/home' />
    );
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <span>Login</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <a href="">Esqueceu sua senha?</a>

        <button className="button" onClick={handleSignIn}>
          Entrar
        </button>

        <div className="footer">
          <p>Não tem uma conta? </p>
          <Link to="/register">Clique aqui!</Link>
        </div>
      </form>
    </div>
  );
}