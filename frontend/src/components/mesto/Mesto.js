import React, { useState, useContext } from 'react';

import Api from '../../utils/api';

import Header from '../Header';
import Main from './main/Main';
import Footer from '../Footer';
import ImagePopup from './main/popups/ImagePopup';
import EditProfilePopup from './main/popups/EditProfilePopup';
import EditAvatarPopup from './main/popups/EditAvatarPopup';
import AddPlacePopup from './main/popups/AddPlacePopup';
import ConfirmRemove from './main/popups/ConfirmRemove';

// Контекст
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardListContext } from '../../contexts/cardListContext';
import { LogicsAllPopups } from '../../contexts/logicsAllPopups';

function Mesto({ setStateUser, setStateCards, loggedIn, signOut }) {

  const [isLoadingData, setIsLoadingData] = useState(false);

  const user = useContext(CurrentUserContext);
  const cardList = useContext(CardListContext);
  const { closeAllPopups, cardRemove } = useContext(LogicsAllPopups);

  const handleUpdateUser = ({ profileName, profileDoes }) => {
    setIsLoadingData(true);
    Api.putUpdateProfile(profileName, profileDoes)
      .then(newUser => {
        setStateUser(newUser.data);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoadingData(true);
    Api.patchUpdateUserAvatar(avatar)
      .then(newUser => {
        setStateUser(newUser.data);
        closeAllPopups();
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    Api.postAddCard(name, link)
      .then(newCard => {
        setStateCards([newCard.data, ...cardList]);
        closeAllPopups();
      });
  };

  const handleCardDelete = () => {
    setIsLoadingData(true);
    Api.deleteCard(cardRemove._id)
      .then(newCard => {
        setStateCards(state => {
          return state.filter(previousCard => {
            return previousCard._id !== cardRemove._id;
          });
        })
        closeAllPopups();
    })
    .finally(() => {
      setIsLoadingData(false);
    });
  };

  //* Card
  const addLike = idCard => {
    Api.putAppendLike(idCard)
      .then(newCard => {
        setStateCards(state => {
          return state.map(previousCard => {
            return previousCard._id === idCard ? newCard.data : previousCard;
          });
        });
      });
  };

  const deleteLike = idCard => {
    Api.deleteLike(idCard)
      .then(newCard => {
        setStateCards(state => {
          return state.map(previousCard => {
            return previousCard._id === idCard ? newCard.data : previousCard;
          });
        });
      });
  };

  const handleCardLike = card => {
    // true лайк стоит
    const isLiked = card.likes.some(like => like === user._id);

    isLiked ? deleteLike(card._id) : addLike(card._id);
  };
  //*

  return (
    <>
      <Header loggedIn={ loggedIn } signOut={ signOut } />
      <Main onCardLike={handleCardLike} />
      <Footer />

      <EditProfilePopup onUpdateUser={handleUpdateUser} loading={isLoadingData} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} loading={isLoadingData} />
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} loading={isLoadingData} />
      <ConfirmRemove onRemoveCard={handleCardDelete} loading={isLoadingData} />

      <ImagePopup name={'popup_edit_img'} />
    </>
  );
}

export default Mesto;
