import React, { useState, /* useEffect, */ useContext } from 'react';
import PopupWithForm from './PopupWithForm';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

function AddPlacePopup({ onAddPlace, loading }) {
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg] = useState('');

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

  return (
    <PopupWithForm title={'Новое место'} name={'popup_add_card'} isOpen={isOpen} onClose={resetFormFieldsOnClose} onSubmit={handleSubmit}>
      <>
        <label className="popup__form-label">
          <input type="text" className="popup__form-input popup__form-input_value_place" id="place-name-input" placeholder="Название" name="placeName" minLength="2" maxLength="30" required value={placeName} onChange={e => setPlaceName(e.target.value)} />
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
