import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

// Валидация
import validateString from '../../../../utils/validate/validateString';

function AddPlacePopup({ onAddPlace, loading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [messageInput, setMessageInput] = useState(false);

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

    const objectInput = validateString(name, 2);

    setIsValid(objectInput.isValidated);
    setMessageInput(objectInput);

    return setPlaceName(name);
  };

  return (
    <PopupWithForm title={'Новое место'} name={'popup_add_card'} isOpen={isOpen} onClose={resetFormFieldsOnClose} onSubmit={handleSubmit}>
      <>
        <label className="popup__form-label">
          <span style={{color: isValid ? '#167c16' : '#d43d3d'/* , display: isValid ? 'none' : 'block' */ }} >
            *
          </span>
          <input type="text" className="popup__form-input popup__form-input_value_place" id="place-name-input" placeholder="Название" name="placeName" minLength="2" maxLength="30" required value={placeName} onChange={checkInputName}
          style={{borderColor: isValid ? 'rgba(0, 0, 0, 0.2)' : '#d43d3d' }} />
          <span style={{color: isValid ? '#167c16' : '#d43d3d' }}>
            {
              isValid ? messageInput.message : messageInput.error
            }
          </span>
        </label>
        <label className="popup__form-label">
          <input type="url" className="popup__form-input popup__form-input_value_img" placeholder="Ссылка на картинку" id="place-img-input" name="placeImg" required value={placeImg} onChange={e => setPlaceImg(e.target.value)} />
        </label>
        <button className="button-popup button-popup_add_card" type="submit" disabled={!isValid} style={{backgroundColor: isValid ? 'black' : 'rgba(0, 0, 0, .3)' }} >
          {loading ? 'Создать...' : 'Создать'}
        </button>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
