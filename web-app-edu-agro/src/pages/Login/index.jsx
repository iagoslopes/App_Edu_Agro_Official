import React, { useState } from 'react';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { useForm } from 'react-hook-form';
import { isEmail } from "validator";
import logo from '../../assets/img_logo.png';
import Snackbar from '@mui/material/Snackbar';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import './style.css';

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

export const Login = () => {
  const navigate = useNavigate();
  const [erros, setErros] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const user = auth.currentUser;

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  async function onSubmit(data) {
    setErros('Carregando...');
    setPopupOpen(true);
    if (user && !user.emailVerified) {
      setErros('E-mail não foi verificado ainda.');
      setPopupOpen(true);
    } else {
      let persistenceType = browserLocalPersistence;

      if (!rememberMe) {
        persistenceType = browserSessionPersistence; // Se "manter a sessão ativa" não estiver marcado, use a sessão
      }

      await setPersistence(auth, persistenceType)
        .then(() => {
          // Realize o login após definir a persistência
          return signInWithEmailAndPassword(auth, data.email, data.password);
        })
        .then(() => {
          navigate("/");
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
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  return (
    <div className="section-login">
      <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link to='/'><h2>Login</h2></Link>
            <div className="inputbox">
              <div className="icon"><HiOutlineMail /></div>
              <input
                className={errors?.email && "input-error"}
                id="email"
                name="email"
                type="email"
                autoComplete='off'
                {...register("email", {
                  required: true,
                  validate: (value) => isEmail(value),
                })}
              ></input>
              <label htmlFor="email"
                className={`floating ${watch('email') ? 'active' : ''}`}>E-mail</label>
              {errors?.email?.type === "required" && (
                <p className="error-message">Email is required.</p>
              )}
              {errors?.email?.type === "validate" && (
                <p className="error-message">Email is invalid.</p>
              )}
            </div>

            <div className="inputbox">
              <div className="icon"><RiLockPasswordLine /></div>
              <input
                className={errors?.password && "input-error"}
                type="password"
                id="password"
                autoComplete='off'
                {...register("password", { required: true, minLength: 6 })}
              ></input>
              <label htmlFor="password"
                className={`floating ${watch('password') ? 'active' : ''}`}>Password</label>
              {errors?.password?.type === "required" && (
                <p className="error-message">Password is required.</p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="error-message">
                  Password needs to have at least 6 characters.
                </p>
              )}
            </div>

            <div className="forget">
              <label htmlFor=""><input type="checkbox" onChange={() => setRememberMe(!rememberMe)} />Remember me<Link className='forget-pass' to="/recuperarSenha">Esqueceu sua senha?</Link></label>
            </div>

            <button type="submit" className="button-login" id='button'>
              Entrar
            </button>

            <div className="link">
              <p>Não tem uma conta? <Link className='register-link' to="/register">Cadastre-se</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}