import React, { useContext } from 'react';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

function ImagePopup({ nameSelector }) {

  // Контекст
  const {
    isShowPopupImg: isOpen,
    closeAllPopups: onClose,
    selectedCard: { name, link }
  } = useContext(LogicsAllPopups);

  const onClosePopupContainer = e => {
    if (e.target.className === `popup ${nameSelector} popup_opened`) {
      onClose();
    }
  };

  return (
    <div className={!isOpen ? `popup ${nameSelector}` : `popup ${nameSelector} popup_opened`} onClick={onClosePopupContainer}>
      <div className="popup__container popup__container_review_img">
        <button className="popup__btn" type="button" onClick={onClose}></button>
        <figure className="popup__img-container">
          <img src={link} className="popup__img" alt={name} />
          <figcaption className="popup__img-text">
            {name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
