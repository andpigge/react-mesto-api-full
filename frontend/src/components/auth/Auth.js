import InfoTooltip from '../mesto/main/popups/InfoTooltip';

function Auth({ titleAuth, authIn, children, messagePopup }) {
  // Максимум что удалось вытащить общего из компонентов
  return (
    <div className='auth auth_center'>
      <h2 className='auth__title'>
        { titleAuth }
      </h2>
      { children }
      <InfoTooltip authIn={ authIn } name='popup_auth_message' messagePopup={messagePopup} />
    </div>
  );
}

export default Auth;
