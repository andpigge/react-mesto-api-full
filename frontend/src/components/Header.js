import React from 'react';
import logo from '../images/logo.svg';
import { Link, useRouteMatch } from 'react-router-dom';

// import { appUrl } from '../utils/constants';

function Header({ loggedIn, signOut }) {

  const { url } = useRouteMatch();

  // Беру свежий токен из localStorage
  const updateToken = () => {
    return localStorage.getItem('email');
  }

  const checkUrl = () => {
    /* Убрал appUrl `${appUrl}/signup` */
    if (url === `/signup`) {
      /* Убрал appUrl `${appUrl}/signup` */
      return <Link to={`/signin`} className='header__link-auth'>Войти</Link>;
    }
    /* Убрал appUrl `${appUrl}/signup` */
    else if (url === `/signin`) {
      /* Убрал appUrl `${appUrl}/signup` */
      return <Link to={`/signup`} className='header__link-auth'>Регистрация</Link>;
    }
    else if (loggedIn) {
      return (
        <>
          <p className='header__email'>
            {
              // localStorage.getItem('email')
              updateToken()
            }
          </p>
          {/* Убрал appUrl `${appUrl}/signup` */}
          <Link to={`/signin`} className='header__link-auth' style={{ color: '#A9A9A9' }} onClick={signOut}>
            Выйти
          </Link>
        </>
      );
    }
  }

  return (
    <header className='header page__position-center page__header'>
      {/* Убрал appUrl `${appUrl}/signup` */}
      <Link to={`/mesto`} target="_self" className="header__link">
        <img src={logo} alt="Место Россия" className="header__logo" />
      </Link>
      {checkUrl()}
    </header>
  );
}

export default Header;
