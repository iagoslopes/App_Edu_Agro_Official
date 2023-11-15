import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { useForm } from 'react-hook-form';
import { isEmail } from "validator";
import Snackbar from '@mui/material/Snackbar';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import './style.css';

//Função de criação do PopUp de mensagem
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
  const [users, setUsers] = useState(null);
  const [erros, setErros] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);

  //Função do hook-form para formatar os campos
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  //Função de cadastro do usuário no firebase
  async function onSubmit(data) {
    setErros('Carregando...');
    setPopupOpen(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            setErros('Cadastrado. Verifique seu e-mail, na sua caixa de spam ou lixo eletrônico');
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
          setErros('Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.');
          setPopupOpen(true);
        }

      });
  }

  //Função para fechar o PopUp com o tempo
  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  //Função para verificar se o usuário ja esta logado e não deixar entrar na página
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Verifique se o usuário foi recém-registrado
        if (currentUser.emailVerified) {
          // O usuário está registrado e verificou o e-mail, então vá para a página inicial
          navigate('/');
        } else {
          //Não faça nada por que para logar é preciso verificar o e-mail então não é preciso colocar mais verificação
        }
      } else {
        setUsers(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


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
                <p className="error-message">E-mail é obrigatório.</p>
              )}
              {errors?.email?.type === "validate" && (
                <p className="error-message">E-mail não é válido.</p>
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
                <p className="error-message">Senha é obrigatório.</p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="error-message">
                  Senha precisa conter pelo menos 6 caractéres.
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
