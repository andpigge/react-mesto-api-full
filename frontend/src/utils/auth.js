import { apiServeAuth } from './constants';
const { CONECT_SERVER, PATHS: { reg, login, user } } = apiServeAuth;

const getResponceServe = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

// Регистрация
const registerApi = dataReg => {
  return fetch(`${CONECT_SERVER}/${reg}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataReg)
  })
    .then(getResponceServe);
}

// Авторизация
const signInApi = dataLogin => {
  return fetch(`${CONECT_SERVER}/${login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataLogin)
  })
    .then(getResponceServe);
}

// Проверка токена
const checkTokenApi = token => {
  return fetch(`${CONECT_SERVER}/${user}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then(getResponceServe);
}

export { registerApi, signInApi, checkTokenApi };
