import React, { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';

import Header from '../../Header';
import Auth from '../Auth';

import { appUrl } from '../../../utils/constants';
import { registerApi } from '../../../utils/auth';

import { LogicsAllPopups } from '../../../contexts/logicsAllPopups';

function Register() {

  const [fieldValue, setFieldValue] = useState({
    authEmail: '',
    authPassword: ''
  });
  const { authEmail, authPassword } = fieldValue;

  const [regIn, setRegIn] = useState(false);

  // Контекст
  const { handAuthClick, closeAllPopups } = useContext(LogicsAllPopups);

  const history = useHistory();

  const submitForm = e => {
    e.preventDefault();
    registerApi({
      password: authPassword,
      email: authEmail
    })
    .then(res => {
      // , res.email);
      setFieldValue({
        authEmail: '',
        authPassword: ''
      });
      setRegIn(true);
      // Единственный вариант, так как history.push() перенаправляет сразу, не дав переписать состояние
      setTimeout(() => {
        // Убрал `${appUrl}/signin`
        history.push(`/signin`);
        closeAllPopups();
      }, 1000);
    })
    .catch(rej => {
      // Возвращается промис в ошибку
      setRegIn(false);
    })
    .finally(() => {
      handAuthClick();
    });
  }

  const setValueFields = e => {
    const { name, value } = e.target;
    setFieldValue(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Header />
      <Auth titleAuth='Регистрация' authIn={regIn} messagePopup='Вы успешно зарегистрировались!' >
        <form className='auth__form' name='registrationInMesto' onSubmit={ submitForm } >
          <input type='email' name='authEmail' className='auth__field-text' placeholder='Email' required onChange={setValueFields} value={ authEmail } />
          <input type='password' name='authPassword' className='auth__field-text' placeholder='Пароль' required onChange={setValueFields} value={ authPassword } />
          <button className='auth__form-button'>
            Зарегистрироваться
          </button>
          <p className='auth__desc'>
            Уже зарегистрированы?
            {/* Убрал `${appUrl}/signin` */}
            <Link to={`/signin`} className='auth__link'>
              &nbsp;Войти
            </Link>
          </p>
        </form>
      </Auth>
    </>
  );
}

export default Register;
