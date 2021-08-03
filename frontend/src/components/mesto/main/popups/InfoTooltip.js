import React, { useContext } from 'react';

// Icon
import iconSuccess from '../../../../images/icons/auth-success-popup.svg';
import iconErr from '../../../../images/icons/auth-error-popup.svg';

// Контекст
import { LogicsAllPopups } from '../../../../contexts/logicsAllPopups';

function InfoTooltip({ name, authIn, messagePopup }) {

  // Контекст
  const {
    isConfirmAuthPoppup: isOpen,
    closeAllPopups: onClose
  } = useContext(LogicsAllPopups);

  const onClosePopupContainer = e => {
    if (e.target.className === `popup ${name} popup_opened`) {
      onClose();
    }
  };

  return (
    <div className={!isOpen ? `popup ${name}` : `popup ${name} popup_opened`} onClick={onClosePopupContainer}>
      <div className="popup__container">
        <button className="popup__btn" type="button" onClick={onClose} />
        <span className='popup__icon-status' style={{ backgroundImage: `url(${authIn ? iconSuccess : iconErr})` }} />
        <p className='popup__auth-desc'>
          { authIn ? messagePopup : 'Что-то пошло не так! Попробуйте ещё раз.' }
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
