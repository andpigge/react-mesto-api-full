import Header from '../../Header';
import Auth from '../Auth';

import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

// Контекст
import { LogicsAllPopups } from '../../../contexts/logicsAllPopups';
import { ValidateInput } from '../../../contexts/validateInput';

import { signInApi } from '../../../utils/auth';

// Валидация
import validatePassword from '../../../utils/validate/validatePassword';
import validateEmail from '../../../utils/validate/validateEmail';
import {
  spanStylesValidateTrue,
  spanStylesValidateFalse,
  inputStylesValidateAuthTrue,
  inputStylesValidateAuthFalse,
  buttonStylesValidateAuthTrue,
  buttonStylesValidateAuthFalse
} from '../../../utils/validate/styles';

function Login({ handleLogin }) {

  const [fieldValue, setFieldValue] = useState({
    authEmail: '',
    authPassword: ''
  });
  const { authEmail, authPassword } = fieldValue;

  const [logIn, setLogIn] = useState(false);

  const [isLoadingData, setIsLoadingData] = useState(false);

  // Контекст
  const { handAuthClick } = useContext(LogicsAllPopups);

  const {
    isValidPasswordLogin, setIsValidPasswordLogin,
    messageInputPasswordLogin, setMessageInputPasswordLogin,
    isValidEmailLogin, setIsValidEmailLogin,
    messageInputEmailLogin, setMessageInputEmailLogin,
    resetInputsValidationLogin,
  } = useContext(ValidateInput);

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

        // Сбрасываю валидацию после входа
        resetInputsValidationLogin();
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

  const checkInputPassword = (e) => {
    const password = e.target.value;

    const objectInput = validatePassword({ password });

    setIsValidPasswordLogin(objectInput.isValidated);
    setMessageInputPasswordLogin(objectInput);

    return setValueFields(e);
  };

  const checkInputEmail = (e) => {
    const email = e.target.value;

    const objectInput = validateEmail({ email });

    setIsValidEmailLogin(objectInput.isValidated);
    setMessageInputEmailLogin(objectInput);

    return setValueFields(e);
  };

  return (
    <>
      <Header />
      <Auth
        titleAuth='Вход'
        authIn={logIn}
        messagePopup='Успех. Подождите...'
      >
        <form
          className='auth__form'
          name='loginInMesto'
          onSubmit={ submitForm }
        >
          <label className='auth__form-label' >
            <span
              className='validationSpan'
              style={ isValidEmailLogin ? spanStylesValidateTrue : spanStylesValidateFalse }
            >
              *
            </span>
            <input
              type='email'
              name='authEmail'
              className='auth__field-text'
              placeholder='Email'
              required
              minLength='8'
              maxLength='254'
              onChange={checkInputEmail}
              value={ authEmail }
              style={ isValidEmailLogin ? inputStylesValidateAuthTrue : inputStylesValidateAuthFalse }
            />
            <span style={ isValidEmailLogin ? spanStylesValidateTrue : spanStylesValidateFalse }>
              {
                isValidEmailLogin ? messageInputEmailLogin.message : messageInputEmailLogin.error
              }
            </span>
          </label>
          <label className='auth__form-label' >
            <span
              className='validationSpan'
              style={ isValidPasswordLogin ? spanStylesValidateTrue : spanStylesValidateFalse }
            >
              *
            </span>
            <input
              type='password'
              name='authPassword'
              className='auth__field-text'
              placeholder='Пароль'
              required
              minLength='8'
              maxLength='128'
              onChange={checkInputPassword}
              value={ authPassword }
              style={ isValidPasswordLogin ? inputStylesValidateAuthTrue : inputStylesValidateAuthFalse }
            />
            <span style={ isValidPasswordLogin ? spanStylesValidateTrue : spanStylesValidateFalse }>
              {
                isValidPasswordLogin ? messageInputPasswordLogin.message : messageInputPasswordLogin.error
              }
            </span>
          </label>
          <button
            className='auth__form-button'
            type="submit"
            style={ isValidPasswordLogin && isValidEmailLogin ?
              buttonStylesValidateAuthTrue : buttonStylesValidateAuthFalse
            }
            disabled={ isValidPasswordLogin && isValidEmailLogin ? false : true }
          >
            {isLoadingData ? 'Войти...' : 'Войти'}
          </button>
        </form>
      </Auth>
    </>
  );
}

export default Login;
