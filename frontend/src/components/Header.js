import logo from '../images/logo.svg';
import { Link, useRouteMatch } from 'react-router-dom';

import { appUrl } from '../utils/constants';

function Header({ loggedIn, signOut }) {
  const { url } = useRouteMatch()

  const checkUrl = () => {
    if (url === `${appUrl}/signup`) {
      return <Link to={`${appUrl}/signin`} className='header__link-auth'>Войти</Link>;
    }
    else if (url === `${appUrl}/signin`) {
      return <Link to={`${appUrl}/signup`} className='header__link-auth'>Регистрация</Link>;
    }
    else if (loggedIn) {
      return (
        <>
          <p className='header__email'>
            {localStorage.getItem('email')}
          </p>
          <Link to={`${appUrl}/signin`} className='header__link-auth' style={{ color: '#A9A9A9' }} onClick={signOut}>
            Выйти
          </Link>
        </>
      );
    }
  }

  return (
    <header className='header page__position-center page__header'>
      <Link to={`${appUrl}/mesto`} target="_self" className="header__link">
        <img src={logo} alt="Место Россия" className="header__logo" />
      </Link>
      {checkUrl()}
    </header>
  );
}

export default Header;
