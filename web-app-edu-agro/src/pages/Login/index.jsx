import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { useForm } from 'react-hook-form';
import { isEmail } from "validator";
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

export const Login = () => {
  const navigate = useNavigate();
  const [erros, setErros] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  async function onSubmit(data) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/home")
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-login-credentials') {
          // Erro de credenciais
          setErros('Usuário e/ou Senha incorreto');
          setPopupOpen(true);
        } else {
          // Outros erros
          setErros('Ocorreu um erro ao autenticar. Por favor, tente novamente mais tarde.');
          setPopupOpen(true);
        }
      });
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <span>Login</span>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            className={errors?.email && "input-error"}
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", {
              required: true,
              validate: (value) => isEmail(value),
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="error-message">Email is required.</p>
          )}

          {errors?.email?.type === "validate" && (
            <p className="error-message">Email is invalid.</p>
          )}
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            className={errors?.password && "input-error"}
            type="password"
            id="password"
            placeholder="*********"
            autoComplete='off'
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password?.type === "required" && (
            <p className="error-message">Password is required.</p>
          )}

          {errors?.password?.type === "minLength" && (
            <p className="error-message">
              Password needs to have at least 6 characters.
            </p>
          )}
        </div>

        <a href="">Esqueceu sua senha?</a>

        <button type="submit" className="button">
          Entrar
        </button>

        <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />

        <div className="footer">
          <p>Não tem uma conta? </p>
          <Link to="/register">Clique aqui!</Link>
        </div>
      </form>
    </div>
  );
}