import React, { useContext } from "react";

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

function PopupWithForm({title, name, isOpen, onClose, children, onSubmit }) {

  const {
    closePopupPlace,
    closePopupAvatar
  } = useContext(LogicsAllPopups);

  const onClosePopupContainer = e => {
    if (e.target.className === `popup ${name} popup_opened`) {
      onClose();
      closePopupPlace();
      closePopupAvatar();
    }
  };

  const onClosePopupButoon = () => {
    onClose();
    closePopupPlace();
    closePopupAvatar();
  };

  return (
    <>
      <div className={!isOpen ? `popup ${name}` : `popup ${name} popup_opened`} onClick={onClosePopupContainer} >
        <div className="popup__container">
          <button className="popup__btn" type="button" onClick={onClosePopupButoon}></button>
          <form className="popup__form" name={name} onSubmit={onSubmit}>
            <h2 className="popup__form-title">
              {title}
            </h2>
            {children}
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
