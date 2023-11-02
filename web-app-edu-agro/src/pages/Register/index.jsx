import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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

export const Register = () => {
  const navigate = useNavigate();
  const [erros, setErros] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  async function onSubmit(data) {
    setErros('Carregando...');
    setPopupOpen(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            setErros('Usuário criado com sucesso. Verifique o seu e-mail');
            setPopupOpen(true);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          // Email já em uso
          setErros('Este email já está em uso. Tente outro.');
          setPopupOpen(true);
        } else {
          // Outros erros
          setError('Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.');
          setPopupOpen(true);
        }

      });
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  return (
    <div className="section-register">
      <AuthPopup open={isPopupOpen} message={erros} onClose={handleClosePopup} />
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit(onSubmit)}>
          <Link to='/'><h2>Cadastro</h2></Link>
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

            <button type="submit" className="button-register" id='button'>
              Cadastrar
            </button>

            <div className="login-link">
              <p>Já tem uma conta? <Link className='register-link' to="/login">Entre</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
