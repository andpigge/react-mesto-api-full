// Для каждого отдельного сервера, свой apiServe объект
const apiServeMesto = {
  // CONECT_SERVER: 'http://mestobackend.nomoredomains.club',
  CONECT_SERVER: 'http://localhost:3000',
  PATHS: {
    user: 'users/me',
    cards: 'cards',
    cardLikes: 'cards/likes'
  }
};

const apiServeAuth = {
  // CONECT_SERVER: 'http://mestobackend.nomoredomains.club',
  CONECT_SERVER: 'http://localhost:3000',
  PATHS: {
    reg: 'signup',
    login: 'signin',
    user: 'users/me',
  }
};

const appUrl = '/mesto-react';

export { apiServeMesto, apiServeAuth, appUrl };
