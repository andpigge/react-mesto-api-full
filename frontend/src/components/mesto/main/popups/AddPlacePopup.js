import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';
import { ValidateInput } from '../../../../contexts/validateInput';

// Валидация
import validateString from '../../../../utils/validate/validateString';
import validateUrl from '../../../../utils/validate/validateUrl';
import {
  spanStylesValidateTrue,
  spanStylesValidateFalse,
  inputStylesValidateTrue,
  inputStylesValidateFalse,
  buttonStylesValidateTrue,
  buttonStylesValidateFalse,
} from '../../../../utils/validate/styles';

function AddPlacePopup({ onAddPlace, loading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg] = useState('');

  // Контекст
  const {
    isAddPlacePopupOpen: isOpen,
    closePopupPlace: onClose,
    isAddPlacePopupOpen
  } = useContext(LogicsAllPopups);

  const {
    isValidNamePlace, setIsValidNamePlace,
    messageInputNamePlace, setMessageInputNamePlace,
    isValidUrl, setIsValidUrl,
    messageInputUrl, setMessageInputUrl,
  } = useContext(ValidateInput);

  // Закрытие попапов по нажатии на esc
  useEffect(() => {
    const closePopupTouchEsc = e => {
      if (e.key === 'Escape') {
        onClose();
        setPlaceName('');
        setPlaceImg('');
      }
    };

    if (isAddPlacePopupOpen) {
      document.addEventListener('keydown', closePopupTouchEsc);
    }
    return () => {
      document.removeEventListener('keydown', closePopupTouchEsc);
    };
  }, [isAddPlacePopupOpen, onClose]);

  const handleSubmit = e => {
    e.preventDefault();

    onAddPlace ({
      name: placeName,
      link: placeImg
    });

    setPlaceName('');
    setPlaceImg('');
  };

  const resetFormFieldsOnClose = () => {
    onClose();
    setPlaceName('');
    setPlaceImg('');
  }

  const checkInputName = (e) => {
    const name = e.target.value;

    const objectInput = validateString({ string: name, minLength: 1, maxLength: 30 });

    setIsValidNamePlace(objectInput.isValidated);
    setMessageInputNamePlace(objectInput);

    return setPlaceName(name);
  };

  const checkInputUrl = (e) => {
    const url = e.target.value;

    const objectInput = validateUrl({ url });

    setIsValidUrl(objectInput.isValidated);
    setMessageInputUrl(objectInput);

    return setPlaceImg(url);
  };

  return (
    <PopupWithForm
      title={ 'Новое место' }
      name={ 'popup_add_card' }
      isOpen={ isOpen }
      onClose={ resetFormFieldsOnClose }
      onSubmit={ handleSubmit }
    >
      <>
        <label className="popup__form-label">
          <span style={ isValidNamePlace ? spanStylesValidateTrue : spanStylesValidateFalse } >
            *
          </span>
          <input
            type="text"
            className="popup__form-input popup__form-input_value_place"
            id="place-name-input" placeholder="Название"
            name="placeName"
            minLength="2"
            maxLength="30"
            required value={ placeName }
            onChange={ checkInputName }
            style={ isValidNamePlace ? inputStylesValidateTrue : inputStylesValidateFalse }
          />
          <span style={ isValidNamePlace ? spanStylesValidateTrue : spanStylesValidateFalse }>
            {
              isValidNamePlace ? messageInputNamePlace.message : messageInputNamePlace.error
            }
          </span>
        </label>
        <label className="popup__form-label">
          <span style={ isValidUrl ? spanStylesValidateTrue : spanStylesValidateFalse } >
            *
          </span>
          <input
            type="url"
            className="popup__form-input popup__form-input_value_img"
            placeholder="Ссылка на картинку"
            id="place-img-input"
            name="placeImg"
            required value={placeImg}
            onChange={ checkInputUrl }
            style={ isValidUrl ? inputStylesValidateTrue : inputStylesValidateFalse }
          />
          <span style={ isValidUrl ? spanStylesValidateTrue : spanStylesValidateFalse }>
            {
              isValidUrl ? messageInputUrl.message : messageInputUrl.error
            }
          </span>
        </label>
        <button
          className="button-popup button-popup_add_card"
          type="submit"
          style={ isValidNamePlace && isValidUrl ? buttonStylesValidateTrue : buttonStylesValidateFalse }
          disabled={ isValidNamePlace && isValidUrl ? false : true }
        >
          { loading ? 'Создать...' : 'Создать' }
        </button>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
