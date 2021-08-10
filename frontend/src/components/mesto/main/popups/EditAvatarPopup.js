import React, { useRef, useContext, useState } from 'react';

import PopupWithForm from './PopupWithForm';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

// Валидация
import validateUrl from '../../../../utils/validate/validateUrl';
import {
  spanStylesValidateTrue,
  spanStylesValidateFalse,
  inputStylesValidateTrue,
  inputStylesValidateFalse,
  buttonStylesValidateTrue,
  buttonStylesValidateFalse,
} from '../../../../utils/validate/styles';

function EditAvatarPopup({ onUpdateAvatar, loading }) {
  // Валидация url
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [messageInputUrl, setMessageInputUrl] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Использую рефы
  const inputRef = useRef();

  // Контекст
  const {
    isEditProfilePopupOpen: isOpen,
    closeAllPopups: onClose
  } = useContext(LogicsAllPopups);

  const handleSubmit = e => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });

    inputRef.current.value = '';
  };

  const resetFormFieldsOnClose = () => {
    onClose();
    inputRef.current.value = '';
  }

  const checkInputUrl = (e) => {
    const url = e.target.value;

    const objectInput = validateUrl({ url });

    setIsValidUrl(objectInput.isValidated);
    setMessageInputUrl(objectInput);
  };

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'popup_edit_img'}
      isOpen={isOpen}
      onClose={resetFormFieldsOnClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__form-label">
          <span style={ isValidUrl ? spanStylesValidateTrue : spanStylesValidateFalse } >
            *
          </span>
          <input
            type="url"
            className="popup__form-input"
            id="url-img-edit"
            placeholder="Ссылка на картинку"
            name="imgEdit"
            required
            ref={inputRef}
            onChange={ checkInputUrl }
            style={ isValidUrl ? inputStylesValidateTrue : inputStylesValidateFalse }
          />
          <span className="popup__error-message url-img-edit-error"></span>
          <span style={ isValidUrl ? spanStylesValidateTrue : spanStylesValidateFalse }>
            {
              isValidUrl ? messageInputUrl.message : messageInputUrl.error
            }
          </span>
        </label>
        <button
          className="button-popup button-popup_edit_img"
          type="submit"
          disabled={ !isValidUrl }
          style={ isValidUrl ? buttonStylesValidateTrue : buttonStylesValidateFalse }
        >
          {loading ? 'Сохранить...' : 'Сохранить'}
        </button>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
