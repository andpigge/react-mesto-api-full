import logo from '../images/logo.svg';
import { Link, useRouteMatch } from 'react-router-dom';

// import { appUrl } from '../utils/constants';
import { useEffect, useState } from 'react';

import MenuMobile from './MenuMobile';

function Header({ loggedIn, signOut }) {
  const [screenWidth, setScreenWidth] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);

  const { url } = useRouteMatch();

  useEffect(() => {
    // Проверка размера экрана
    const checkSizeWindow = () => {
      setScreenWidth(window.screen.width);
    }

    if (loggedIn) {
      // Изначально пользователь может зайти с телефона
      checkSizeWindow();
      window.addEventListener('resize', checkSizeWindow);
      return;
    }
    window.removeEventListener('resize', checkSizeWindow);
  }, [loggedIn]);

  const toggleClass = () => {
    setActiveMenu(!activeMenu);
  }

  const checkUrl = () => {
    if (url === `/signup`) {
      return (
      <Link to={`/signin`} className='header__link-auth'>
        Войти
      </Link>
    )}
    else if (url === `/signin`) {
      return (
      <Link to={`/signup`} className='header__link-auth'>
        Регистрация
      </Link>
      )}
  }

  const renderEmail = () => {
    if (loggedIn && screenWidth < '505') {
      return (
        <button type='button' className={activeMenu ? 'header__toggle-menu header__toggle-menu_active' : 'header__toggle-menu'} onClick={toggleClass} />
      );
    }
    else if (loggedIn) {
      return (
        <>
          <p className='header__email'>
            {localStorage.getItem('email')}
          </p>
          <Link to={`/signin`} className='header__link-auth' style={{ color: '#A9A9A9' }} onClick={signOut}>
            Выйти
          </Link>
        </>
      );
    }
  }

  return (
    <>
      {/* Эндпоинт 505px же, до этого размера шапка выглядит нормально. Я сразу проверяю когда зашел пользователь какое у него разрешение, и после при изменении экрана. Все проверил, все отлично. На страницах регистрация и вход такого меню не должно быть */}
      <MenuMobile signOut={ signOut } activeMenu={ activeMenu } />
      <header className='header page__position-center page__header'>
        <Link to={`/mesto`} target="_self" className="header__link">
          <img src={logo} alt="Место Россия" className="header__logo" />
        </Link>
        { checkUrl() }
        { renderEmail() }
      </header>
    </>
  );
}

export default Header;
