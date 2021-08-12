import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Api from '../utils/api';

// GIF preloader
import gifPreloader from '../images/gif/preloaderProfileImg.gif';

// Страницы
import Mesto from './mesto/Mesto';
import Register from './auth/register/Register';
import Login from './auth/login/Login';

import { checkTokenApi } from '../utils/auth';

// Контекст
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardListContext } from '../contexts/cardListContext';
import { LogicsAllPopups } from '../contexts/logicsAllPopups';
import { ValidateInput } from '../contexts/validateInput';

// HOC
import ProtectedRoute from './ProtectedRoute';

function App() {

  // Информация о пользователе
  const [currentUser, setCurrentUser] = useState({
    about: 'Загрузка...',
    name: 'Пожалуйста подождите',
    avatar: gifPreloader
  });

  // Информация о карточек
  const [cardList, setCardList] = React.useState([]);

  const [selectedCard, setselectedCard] = useState({});

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isShowPopupImg, setShowPopupImg] = useState(false);
  const [isConfirmPoppup, setConfirmPoppup] = useState(false);
  const [isConfirmAuthPoppup, setConfirmAuthPoppup] = useState(false);

  const [cardRemove, setCardRemove] = React.useState({});

  // Статус пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Валидация имени для профиля
  const [isValidNameProfile, setIsValidNameProfile] = useState(true);
  const [messageInputNameProfile, setMessageInputNameProfile] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация имени для места
  const [isValidNamePlace, setIsValidNamePlace] = useState(false);
  const [messageInputNamePlace, setMessageInputNamePlace] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация url
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [messageInputUrl, setMessageInputUrl] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация описания
  const [isValidDesc, setIsValidDesc] = useState(true);
  const [messageInputDesc, setMessageInputDesc] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация пароля для Входа
  // Добавляю в app, так как HOC или пользовательские хуки работают только в самом компоненте.
  // А мне надо менять логику при изменении в поле данных
  const [ isValidPasswordLogin, setIsValidPasswordLogin ] = useState(false);
  const [ messageInputPasswordLogin, setMessageInputPasswordLogin ] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация пароля для Регистрации
  const [ isValidPasswordReg, setIsValidPasswordReg ] = useState(false);
  const [ messageInputPasswordReg, setMessageInputPasswordReg ] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация email для Входа
  const [ isValidEmailLogin, setIsValidEmailLogin ] = useState(false);
  const [ messageInputEmailLogin, setMessageInputEmailLogin ] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  // Валидация email для Регистрации
  const [ isValidEmailReg, setIsValidEmailReg ] = useState(false);
  const [ messageInputEmailReg, setMessageInputEmailReg ] = useState({
    isValidated: false,
    message: null,
    error: null
  });

  useEffect(() => {
    if (loggedIn) {
      // Данные должны подгружаться одновремено
      Promise.all([Api.getInitialUser(), Api.getInitialCards()])
      .then(([ user, cardList ]) => {
        setCurrentUser({
          about: user.data.about,
          name: user.data.name,
          avatar: user.data.avatar,
          _id: user.data._id,
        });
        setCardList(cardList.data);
      });
    }
  }, [loggedIn]);

  // Закрытие попапов
  function closeAllPopups() {
    setShowPopupImg(false);
    setConfirmPoppup(false);
    setConfirmAuthPoppup(false);
  }

  function closePopupPlace() {
    setIsValidNamePlace(false);
    setMessageInputNamePlace({
      isValidated: false,
      message: null,
      error: null
    });
    setIsValidUrl(false);
    setMessageInputUrl({
      isValidated: false,
      message: null,
      error: null
    });
    setAddPlacePopupOpen(false);
  }

  function closePopupAvatar() {
    setIsValidUrl(false);
    setMessageInputUrl({
      isValidated: false,
      message: null,
      error: null
    });
    setEditProfilePopupOpen(false);
  }

  function closePopupProfile() {
    setIsValidNameProfile(true);
    setMessageInputNameProfile({
      isValidated: false,
      message: null,
      error: null
    });
    setIsValidDesc(true);
    setMessageInputDesc({
      isValidated: false,
      message: null,
      error: null
    });
    setEditAvatarPopupOpen(false);
  }

  // Сбрасываю валидацию
  const resetInputsValidationLogin = () => {
    setIsValidPasswordLogin(false);
    setMessageInputPasswordLogin({
      isValidated: false,
      message: null,
      error: null
    });
    setIsValidEmailLogin(false);
    setMessageInputEmailLogin({
      isValidated: false,
      message: null,
      error: null
    });
  }

  const resetInputsValidationReg = () => {
    setIsValidPasswordReg(false);
    setMessageInputPasswordReg({
      isValidated: false,
      message: null,
      error: null
    });
    setIsValidEmailReg(false);
    setMessageInputEmailReg({
      isValidated: false,
      message: null,
      error: null
    });
  }

  const history = useHistory();

  // Заход на сайт
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkTokenApi(token)
        .then(res => {
          localStorage.setItem('email', res.data.email);
          setLoggedIn(true);
          history.push(`/mesto`);
        });
    }
  }, [loggedIn]);

  // Закрытие попапов по нажатии на esc
  useEffect(() => {
    const closePopupTouchEsc = e => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    if (isShowPopupImg || isConfirmPoppup || isConfirmAuthPoppup) {
      document.addEventListener('keydown', closePopupTouchEsc);
    }
    return () => {
      document.removeEventListener('keydown', closePopupTouchEsc);
    };
  }, [isShowPopupImg, isConfirmPoppup, isConfirmAuthPoppup]);

  function handleCardClick(name, link) {
    setselectedCard({name, link});
    setShowPopupImg(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setConfirmPoppup(true);
    setCardRemove(card);
  }

  function handAuthClick() {
    setConfirmAuthPoppup(true);
  }

  const popups = {
    closeAllPopups,
    closePopupPlace,
    closePopupAvatar,
    closePopupProfile,
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    handleCardClick,
    handleDeleteCardClick,
    handAuthClick,
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isConfirmPoppup,
    isShowPopupImg,
    selectedCard,
    cardRemove,
    isConfirmAuthPoppup
  };

  const validateInput = {
    isValidNameProfile, setIsValidNameProfile,
    messageInputNameProfile, setMessageInputNameProfile,
    isValidNamePlace, setIsValidNamePlace,
    messageInputNamePlace, setMessageInputNamePlace,
    isValidUrl, setIsValidUrl,
    messageInputUrl, setMessageInputUrl,
    isValidDesc, setIsValidDesc,
    messageInputDesc, setMessageInputDesc,
    isValidPasswordLogin, setIsValidPasswordLogin,
    messageInputPasswordLogin, setMessageInputPasswordLogin,
    isValidEmailLogin, setIsValidEmailLogin,
    messageInputEmailLogin, setMessageInputEmailLogin,
    isValidPasswordReg, setIsValidPasswordReg,
    messageInputPasswordReg, setMessageInputPasswordReg,
    isValidEmailReg, setIsValidEmailReg,
    messageInputEmailReg, setMessageInputEmailReg,
    resetInputsValidationLogin,
    resetInputsValidationReg
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    history.push(`/signin`);
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={ currentUser } >
      <CardListContext.Provider value={ cardList }>
        <LogicsAllPopups.Provider value={ popups } >
          <ValidateInput.Provider value={ validateInput } >
            <Switch>

              {/* HOC. Создаем лишний компонент */}
              <ProtectedRoute
                path={`/mesto`}
                loggedIn={loggedIn}
                signOut={signOut}
                setStateUser={setCurrentUser}
                setStateCards={setCardList}
                component={Mesto}
              />

              <Route path={`/signup`}>
                <Register />
              </Route>
              <Route path={`/signin`}>
                <Login handleLogin={handleLogin} />
              </Route>

              <Route path='*'>
                { loggedIn ? (
                  <Redirect to={`/mesto`} />
                  ) : (
                  <Redirect to={`/signin`} />
                )}
              </Route>
              {/* <Route path='*'>
                <h1 style={mainText}>
                  404
                </h1>
              </Route> */}
            </Switch>
          </ValidateInput.Provider>
        </LogicsAllPopups.Provider>
      </CardListContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
