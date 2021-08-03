import React, { useContext } from 'react';

import Card from './Card';

import profileEditImg from '../../../images/icons/profile-btn-edit.svg';

// Контекст
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { CardListContext } from '../../../contexts/cardListContext';
import { LogicsAllPopups } from '../../../contexts/logicsAllPopups';

function Main({ onCardLike }) {

  // Контекст
  const { avatar, about, name } = useContext(CurrentUserContext);
  const cardList = useContext(CardListContext);
  const {
    handleEditAvatarClick: onEditAvatar,
    handleEditProfileClick: onEditProfile,
    handleAddPlaceClick: onAddPlace,
    handleCardClick: onCardClick,
    handleDeleteCardClick: onCardDelete
  } = useContext(LogicsAllPopups);


  return (
    <main className="content">
      <section className="profile content__position-center content__profile">
        <div className="profile__img-container">
          <img src={avatar} alt="Портрет" className="profile__img" style={{backgroundImage: `url(${avatar})`}} />
          <img src={profileEditImg} alt="Кнопка редактирования" className="profile__edit-img" onClick={onEditProfile} />
        </div>
        <div className="profile__about">
          <div className="profile__container-text">
            <h1 className="profile__title-name">{name}</h1>
            <p className="profile__subtitle-does">{about}</p>
          </div>
          <button className="profile__edit-btn" type="button" onClick={onEditAvatar} />
        </div>
        <button className="profile__add-card-place" type="button" onClick={onAddPlace} />
      </section>

      <section className="place content__position-center content__place">
        <ul className="place__list">
          {
            cardList.length > 0 ?
            cardList.map(card => {
              return <li className="place__item" key={card._id}>
              {/* Передаю уникальный ключ, React сам подставит его. */}
                <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
              </li>
            }) :
            cardList.length === 0 ? <h1 style={{color: 'white'}}>Пусто</h1>
              :
            // Это прелоадер
            <div className='place__result'></div>
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
