import React, { useContext } from 'react';

// Контекст
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Деструктуризация
  const { owner, link, name, likes } = card;

  // Контекст user
  const { _id } = useContext(CurrentUserContext);

  const toggleClassIcon = () => {
    // Является ли карточка моей
    return owner === _id ? 'card-place__delete-btn' : 'card-place__delete-btn card-place__delete-btn_display_none';
  };

  // При монтировании есть ли на карточке лайк
  const isLiked = () => {
    // Немного оптимизации. Если к примеру все карточки не будут иметь лайков, то и проверять их незачем
    if (likes.length > 0) {
      // Лайкнул карточку или нет
      const isLiked = likes.some(like => like === _id);
      return isLiked ? 'card-place__like-btn card-place__like-btn_active' : 'card-place__like-btn';
    }
    return 'card-place__like-btn';
  };

  const cardClick = () => {
    onCardClick(name, link);
  };

  const cardLike = () => {
    onCardLike(card)
  };

  return (
    <div className="card-place">
      <button className={ toggleClassIcon() } onClick={() => onCardDelete(card)} />
      <img src={link} alt={name} className="card-place__img" onClick={cardClick} />
      <h2 className="card-place__title">
      {name}
      </h2>
      <div className="card-place__likes">
      <button className={ isLiked() } type="button" onClick={cardLike} />
      <span className="card-place__counter">{ likes.length }</span>
      </div>
    </div>
  );
}

export default Card;
