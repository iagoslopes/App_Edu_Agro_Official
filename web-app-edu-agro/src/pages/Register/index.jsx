import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { useForm } from 'react-hook-form';
import { isEmail } from "validator";
import logo from '../../assets/img_logo.png';
import './style.css';

export const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  async function onSubmit(data) {
    //console.log(data)
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" />
        <span>Cadastro</span>
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

        <button type="submit" className="button">
          Cadastrar
        </button>

        <div className="footer">
          <p>Já tem uma conta? </p>
          <Link to="/">Acesse sua conta aqui!</Link>
        </div>
      </form>
    </div>
  );
}
