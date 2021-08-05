// dotenv позволяет писать конструкции
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// Защита заголовков
const helmet = require('helmet');

// Обработка ошибок
const { errors } = require('celebrate');

// Позволяет без капчи зашитится от автоматических входов
const rateLimit = require('express-rate-limit');

// Позволяет удобно вытаскивать куки
const cookieParser = require('cookie-parser');

// Ошибки
const NotFoundError = require('./errorsHandler/NotFoundError');

// Мидлвэа, центральный обработчик ошибок
const errHandler = require('./middlewares/errHandler');

// Маршруты
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerAuth = require('./routes/auth');

// Мидлвэа для защиты маршрутов
const { auth } = require('./middlewares/auth');

// Логи ошибок, запись ошибок в файл
const { requestLogger, errorLoger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// const allowedCors = [
//   'http://mestobackend.nomoredomains.club',
//   'https://mestobackend.nomoredomains.club',
//   'http://mestofrontend.nomoredomains.club',
//   'https://mestofrontend.nomoredomains.club',
//   'https://localhost:3000',
//   'https://localhost:3001',
// ];

// app.use(cors({
//   origin: '*',
// }));

// Обработка CORS
// Не работает на сервере
app.use((req, res, next) => {
  // const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Origin', '*');
  // В тренажере написано что эта команда должна работать, но она работает через раз
  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', 'origin');
  // }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

// Подключение к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(limiter);

// Вроде как все по умолчанию выставленно, не очень разбираюсь в заголовках
app.use(helmet());

// Подключение встроенного парсера в express, чтобы вытаскивать из тела данные
// Вот так: const { name, about, avatar } = req.body;
app.use(express.json());

// Подключаем cookieParser как мидлвэа
app.use(cookieParser());

// Логгер запросов подключаю до всех маршрутов.
app.use(requestLogger);

// Экспортирую маршруты
app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);
app.use('/', routerAuth);
// Если нет корректного маршрута
app.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

// Логгер оштбок. Подключаю после всех маршрутов, но до обработки ошибок
app.use(errorLoger);

// Обработка ошибок celebrate
app.use(errors());

// Подключаю ко всем маршрутам, центральный обработчик ошибок
app.use(errHandler);

// Ругается eslint на консоль, не знаю почему, выдает ошибку warning.
app.listen(PORT/* , () => console.log(`Приложение запущенно на порту ${PORT}`) */);
