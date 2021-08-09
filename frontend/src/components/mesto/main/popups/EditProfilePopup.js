import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

// Контекст
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

// Валидация
import validateString from '../../../../utils/validate/validateString';
import {
  spanStylesValidateTrue,
  spanStylesValidateFalse,
  inputStylesValidateTrue,
  inputStylesValidateFalse,
  buttonStylesValidateTrue,
  buttonStylesValidateFalse,
} from '../../../../utils/validate/styles';

function EditProfilePopup({ onUpdateUser, loading }) {
  const [profileValue, setProfileValue] = useState({
    profileName: '',
    profileDoes: ''
  });
  const {profileName, profileDoes} = profileValue;

  // Валидация имени
  const [isValidName, setIsValidName] = useState(true);
  const [messageInputName, setMessageInputName] = useState({});

  // Валидация описания
  const [isValidDesc, setIsValidDesc] = useState(true);
  const [messageInputDesc, setMessageInputDesc] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Контекст
  const { about, name } = useContext(CurrentUserContext);
    // validation = useContext(ValidationFormContext););

  const {
    isEditAvatarPopupOpen: isOpen,
    closeAllPopups: onClose
  } = useContext(LogicsAllPopups);

  // Вторым параметром передал переменные зависимости, те что используются в useEffect
  useEffect(() => {
    setProfileValue({
      profileName: name,
      profileDoes: about
    });
  }, [name, about]);

  // Немного усложнил задачу, чтобы потренироваться, понять как реализуется задача по-другому
  const handleChange = e => {
    setProfileValue(state => {
      const previousValue = Object.assign({}, state);
      previousValue[e.target.name] = e.target.value;
      return previousValue;
    });
  }

  const handleSabmit = e => {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(profileValue);
  };

  const resetFormFieldsOnClose = () => {
    onClose();
    setProfileValue({
      profileName: name,
      profileDoes: about
    });
  }

  const checkInputName = (e) => {
    const name = e.target.value;

    const objectInput = validateString({ string: name, minLength: 1, maxLength: 40 });

    setIsValidName(objectInput.isValidated);
    setMessageInputName(objectInput);

    return handleChange(e);
  };

  const checkInputDescription = (e) => {
    const name = e.target.value;

    const objectInput = validateString({ string: name, minLength: 1, maxLength: 200 });

    setIsValidDesc(objectInput.isValidated);
    setMessageInputDesc(objectInput);

    return handleChange(e);
  };

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'popup_edit_profile'}
      isOpen={isOpen}
      onClose={resetFormFieldsOnClose}
      onSubmit={handleSabmit}
    >
      <>
        <label className="popup__form-label">
          <span style={ isValidName ? spanStylesValidateTrue : spanStylesValidateFalse } >
            *
          </span>
          {/* С помощью value и onChange создал управляющий компонент, где содержимое берется из state компонента */}
          <input
            type="text"
            className="popup__form-input popup__form-input_value_name"
            id="profile-name-input"
            placeholder="Имя"
            name="profileName"
            minLength="2"
            maxLength="40"
            required
            value={profileName}
            onChange={ checkInputName }
            style={ isValidName ? inputStylesValidateTrue : inputStylesValidateFalse }
          />
          <span style={ isValidName ? spanStylesValidateTrue : spanStylesValidateFalse }>
            {
              isValidName ? messageInputName.message : messageInputName.error
            }
          </span>
        </label>
        <label className="popup__form-label">
          <span style={ isValidDesc ? spanStylesValidateTrue : spanStylesValidateFalse } >
            *
          </span>
          <input
            type="text"
            className="popup__form-input popup__form-input_value_does"
            id="profile-does-input"
            placeholder="Деятельность"
            name="profileDoes"
            minLength="2"
            maxLength="200"
            required
            value={profileDoes}
            onChange={ checkInputDescription }
            style={ isValidDesc ? inputStylesValidateTrue : inputStylesValidateFalse }
          />
          <span style={ isValidDesc ? spanStylesValidateTrue : spanStylesValidateFalse }>
            {
              isValidDesc ? messageInputDesc.message : messageInputDesc.error
            }
          </span>
        </label>
        <button
          className="button-popup button-popup_edit_profile"
          type="submit"
          style={ isValidName && isValidDesc ? buttonStylesValidateTrue : buttonStylesValidateFalse }
          disabled={ !isValidName && !isValidDesc }
        >
          {loading ? 'Сохранить...' : 'Сохранить'}
        </button>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
