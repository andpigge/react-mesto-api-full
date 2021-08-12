import React, { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';

import Header from '../../Header';
import Auth from '../Auth';

import { registerApi } from '../../../utils/auth';

// Контекст
import { LogicsAllPopups } from '../../../contexts/logicsAllPopups';
import { ValidateInput } from '../../../contexts/validateInput';

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

function Register() {

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [fieldValue, setFieldValue] = useState({
    authEmail: '',
    authPassword: ''
  });
  const { authEmail, authPassword } = fieldValue;

  const [regIn, setRegIn] = useState(false);

  // Контекст
  const { handAuthClick } = useContext(LogicsAllPopups);

  const {
    isValidPasswordReg, setIsValidPasswordReg,
    messageInputPasswordReg, setMessageInputPasswordReg,
    isValidEmailReg, setIsValidEmailReg,
    messageInputEmailReg, setMessageInputEmailReg,
    resetInputsValidationReg,
  } = useContext(ValidateInput);

  const history = useHistory();

  const submitForm = e => {
    e.preventDefault();
    setIsLoadingData(true);

    registerApi({
      password: authPassword,
      email: authEmail
    })
    .then(res => {
      setFieldValue({
        authEmail: '',
        authPassword: ''
      });
      setRegIn(true);
      history.push(`/signin`);

      // Сбрасываю валидацию после регистрации
      resetInputsValidationReg()
    })
    .catch(rej => {
      // Возвращается промис в ошибку
      setRegIn(false);
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

    setIsValidPasswordReg(objectInput.isValidated);
    setMessageInputPasswordReg(objectInput);

    return setValueFields(e);
  };

  const checkInputEmail = (e) => {
    const email = e.target.value;

    const objectInput = validateEmail({ email });

    setIsValidEmailReg(objectInput.isValidated);
    setMessageInputEmailReg(objectInput);

    return setValueFields(e);
  };

  return (
    <>
      <Header />
      <Auth
        titleAuth='Регистрация'
        authIn={regIn}
        messagePopup='Вы успешно зарегистрировались!'
      >
        <form
          className='auth__form'
          name='registrationInMesto'
          onSubmit={ submitForm }
        >
          <label className='auth__form-label' >
            <span
              className='validationSpan'
              style={ isValidEmailReg ? spanStylesValidateTrue : spanStylesValidateFalse }
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
              style={ isValidEmailReg ? inputStylesValidateAuthTrue : inputStylesValidateAuthFalse }
            />
            <span style={ isValidEmailReg ? spanStylesValidateTrue : spanStylesValidateFalse }>
              {
                isValidEmailReg ? messageInputEmailReg.message : messageInputEmailReg.error
              }
            </span>
          </label>
          <label className='auth__form-label' >
            <span
              className='validationSpan'
              style={ isValidPasswordReg ? spanStylesValidateTrue : spanStylesValidateFalse }
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
              style={ isValidPasswordReg ? inputStylesValidateAuthTrue : inputStylesValidateAuthFalse }
            />
            <span style={ isValidPasswordReg ? spanStylesValidateTrue : spanStylesValidateFalse }>
              {
                isValidPasswordReg ? messageInputPasswordReg.message : messageInputPasswordReg.error
              }
            </span>
          </label>
          <button
            className='auth__form-button'
            type="submit"
            style={ isValidPasswordReg && isValidEmailReg ?
              buttonStylesValidateAuthTrue : buttonStylesValidateAuthFalse
            }
            disabled={ isValidPasswordReg && isValidEmailReg ? false : true }
          >
            {isLoadingData ? 'Зарегистрироваться...' : 'Зарегистрироваться'}
          </button>
          <p className='auth__desc'>
            Уже зарегистрированы?
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
