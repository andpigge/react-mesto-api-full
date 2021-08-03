import {apiServeMesto} from './constants.js';
const {CONECT_SERVER, /* COHORT_ID, */ PATHS} = apiServeMesto;

class Api {
  #baseUrl
  #headers
  #pathUser
  #pathCards
  #cardLikes
  constructor({baseUrl, headers, paths: {user, cards, cardLikes}}) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
    this.#pathUser = user;
    this.#pathCards = cards;
    this.#cardLikes = cardLikes;
  }

  // Беру свежий токен из localStorage
  _updateToken() {
    this.#headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _serverConnectionGet(path) {
    this._updateToken();
    return fetch(`${this.#baseUrl}/${path}`, {
      headers: this.#headers
    })
    .then(this._checkResponse);
  }

  _serverConnectionSend(path, method, body) {
    this._updateToken();
    return fetch(`${this.#baseUrl}/${path}`, {
      method,
      headers: this.#headers,
      body: JSON.stringify(body)
    })
    .then(this._checkResponse);
  }

  _serverConnectionEdit(path, method, dataItem) {
    this._updateToken();
    return fetch(`${this.#baseUrl}/${path}/${dataItem}`, {
      method,
      headers: this.#headers
    })
    .then(this._checkResponse);
  }

  _serverConnectionEditLike(method, dataItem) {
    this._updateToken();
    return fetch(`${this.#baseUrl}/cards/${dataItem}/likes`, {
      method,
      headers: this.#headers
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return this._serverConnectionGet(this.#pathCards);
  }

  getInitialUser() {
    return this._serverConnectionGet(this.#pathUser);
  }

  putUpdateProfile(name, about) {
    return this._serverConnectionSend(this.#pathUser, 'PUT', {
      name,
      about
    });
  }

  postAddCard(name, link) {
    return this._serverConnectionSend(this.#pathCards, 'POST', {
      name,
      link
    });
  }


  deleteCard(cardId) {
    return this._serverConnectionEdit(this.#pathCards, 'DELETE', cardId);
  }

  putAppendLike(cardId) {
    return this._serverConnectionEditLike('PUT', cardId);
  }

  deleteLike(cardId) {
    return this._serverConnectionEditLike('DELETE', cardId);
  }

  patchUpdateUserAvatar(avatarUrl) {
    return this._serverConnectionSend(`${this.#pathUser}/avatar`, 'PUT', {avatar: avatarUrl});
  }
}

export default new Api({
  baseUrl: `${CONECT_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
  },
  paths: PATHS
});
