import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

function AddPlacePopup({ onAddPlace, loading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg] = useState('');

  const [isValid, setIsValid] = useState('false');
  const [messageInput, setMessageInput] = useState('false');

  const handleSubmit = e => {
    e.preventDefault();

    onAddPlace ({
      name: placeName,
      link: placeImg
    });

    setPlaceName('');
    setPlaceImg('');
  };

  const {
    isAddPlacePopupOpen: isOpen,
    closeAllPopups: onClose
  } = useContext(LogicsAllPopups);

  const resetFormFieldsOnClose = () => {
    onClose();
    setPlaceName('');
    setPlaceImg('');
  }

  const checkInputName = (e) => {
    const name = e.target.value;
    const objectInput = validateAddCardInput(name, 2);

    setIsValid(objectInput.isValidated);
    setMessageInput(objectInput);

    return setPlaceName(name);
  };

  // Шаблон
  const checkMinLengthInput = (name, minLength) => {
    return name.length > minLength ? true : false;
  };

  const validateAddCardInput = (name, minLength) => {
    const isValidMinLength = checkMinLengthInput(name, minLength);

    const result = {
      isValidated: isValidMinLength,
      message: null,
      error: null
    };

    if (isValidMinLength) {
      result.message = 'Успешно';
    } else {
      result.error = 'Длина должна быть больше 2 символов';
    }

    return result;
  };

  return (
    <PopupWithForm title={'Новое место'} name={'popup_add_card'} isOpen={isOpen} onClose={resetFormFieldsOnClose} onSubmit={handleSubmit}>
      <>
        <label className="popup__form-label">
          <input type="text" className="popup__form-input popup__form-input_value_place" id="place-name-input" placeholder="Название" name="placeName" minLength="2" maxLength="30" required value={placeName} onChange={checkInputName} />
          <span>
            {
              isValid ? messageInput.message : messageInput.error
            }
          </span>
        </label>
        <label className="popup__form-label">
          <input type="url" className="popup__form-input popup__form-input_value_img" placeholder="Ссылка на картинку" id="place-img-input" name="placeImg" required value={placeImg} onChange={e => setPlaceImg(e.target.value)} />
        </label>
        <button className="button-popup button-popup_add_card" type="submit" >
          {loading ? 'Создать...' : 'Создать'}
        </button>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
