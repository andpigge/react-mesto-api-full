import React, { useRef, useContext } from 'react';

import PopupWithForm from './PopupWithForm';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

function EditAvatarPopup({ onUpdateAvatar, loading }) {
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

  return (
    <PopupWithForm title={'Обновить аватар'} name={'popup_edit_img'} isOpen={isOpen} onClose={resetFormFieldsOnClose} onSubmit={handleSubmit}>
      <>
        <label className="popup__form-label">
          <input type="url" className="popup__form-input" id="url-img-edit" placeholder="Ссылка на картинку" name="imgEdit" required ref={inputRef} />
          <span className="popup__error-message url-img-edit-error"></span>
        </label>
        <button className="button-popup button-popup_edit_img" type="submit" >
          {loading ? 'Сохранить...' : 'Сохранить'}
        </button>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
