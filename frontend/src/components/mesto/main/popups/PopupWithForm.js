function PopupWithForm({title, name, isOpen, onClose, children, onSubmit }) {

  const onClosePopupContainer = e => {
    if (e.target.className === `popup ${name} popup_opened`) {
      onClose();
    }
  };

  return (
    <>
      <div className={!isOpen ? `popup ${name}` : `popup ${name} popup_opened`} onClick={onClosePopupContainer} >
        <div className="popup__container">
          <button className="popup__btn" type="button" onClick={onClose}></button>
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
