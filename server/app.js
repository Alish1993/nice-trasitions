const express = require('express');
const morgan = require('morgan');
const { uploadDirectory, router } = require('./router/postRouter'); // Импортируйте router из postRouter

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Подключаем папку 'uploads' для доступа к статическим файлам
app.use('/uploads', uploadDirectory);

// Подключаем маршруты
app.use('/api/post', router);

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

module.exports = app;
