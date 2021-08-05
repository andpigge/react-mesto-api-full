// Для каждого отдельного сервера, свой apiServe объект
const apiServeMesto = {
  CONECT_SERVER: 'http://mestobackend.nomoredomains.club',
  PATHS: {
    user: 'users/me',
    cards: 'cards',
    cardLikes: 'cards/likes'
  }
};

const apiServeAuth = {
  CONECT_SERVER: 'http://mestobackend.nomoredomains.club',
  PATHS: {
    reg: 'signup',
    login: 'signin',
    user: 'users/me',
  }
};

const appUrl = '/mesto-react';

export { apiServeMesto, apiServeAuth, appUrl };
