
import { Link } from 'react-router-dom';

// import { appUrl } from '../utils/constants';

function MenuMobile({ signOut, activeMenu }) {
  return (
    <div className={activeMenu ? 'menu-mobile menu-mobile_active' : 'menu-mobile'}>
      <p className='menu-mobile__email header__email' style={{ display: activeMenu ? 'block' : 'none' }}>
        {localStorage.getItem('email')}
      </p>
      {/* Убрал appUrl `${appUrl}/signup` */}
      <Link to={`/signin`} className='menu-mobile__auth header__link-auth' style={{ color: '#A9A9A9' }} onClick={signOut}>
        Выйти
      </Link>
    </div>
  );
}

export default MenuMobile;
