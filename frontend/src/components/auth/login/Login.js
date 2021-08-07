import Header from '../../Header';
import Auth from '../Auth';

import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import { LogicsAllPopups } from '../../../contexts/logicsAllPopups';

import { signInApi } from '../../../utils/auth';
// import { appUrl } from '../../../utils/constants';

function Login({ handleLogin }) {

  const [fieldValue, setFieldValue] = useState({
    authEmail: '',
    authPassword: ''
  });
  const { authEmail, authPassword } = fieldValue;

  const [logIn, setLogIn] = useState(false);

  // Контекст
  const { handAuthClick/* , closeAllPopups */ } = useContext(LogicsAllPopups);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const history = useHistory();

  // Сработает при нажатии на кнопку вход, при авторизации
  const submitForm = e => {
    e.preventDefault();
    setIsLoadingData(true);

    // Запрос к Api сервера
    signInApi({
      password: authPassword,
      email: authEmail
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setFieldValue({
          authEmail: '',
          authPassword: ''
        });
        handleLogin();
        setLogIn(true);
        history.push(`/mesto`);
        // Единственный вариант, так как history.push() перенаправляет сразу, не дав переписать состояние
        // setTimeout(() => {
        //   // Убрал ${appUrl}/mesto`
        //   history.push(`/mesto`);
        //   closeAllPopups();
        // }, 1);
      }
    })
    .catch(rej => {
      setLogIn(false);
      handAuthClick();
      // Компоненты удалятся сами. finally не надо. В случае ошибки false добавиться
      setIsLoadingData(false);
    })
  }

  const setValueFields = e => {
    const { name, value } = e.target;
    setFieldValue(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Header />
      <Auth titleAuth='Вход' authIn={logIn} messagePopup='Успех. Подождите...' >
        <form className='auth__form' name='loginInMesto' onSubmit={ submitForm } >
          <input type='email' name='authEmail' className='auth__field-text' placeholder='Email' required onChange={setValueFields} value={ authEmail } />
          <input type='password' name='authPassword' className='auth__field-text' placeholder='Пароль' required onChange={setValueFields} value={ authPassword } />
          <button className='auth__form-button'>
            {isLoadingData ? 'Войти...' : 'Войти'}
          </button>
        </form>
      </Auth>
    </>
  );
}

export default Login;
