const express = require('express');
const morgan = require('morgan');
const { upload, uploadDirectory, uploadFiles } = require('./middelewares/multer');
const postRouter = require('./router/postRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Подключаем папку 'uploads' для доступа к статическим файлам
app.use('/uploads', uploadDirectory);

// Маршрут для загрузки файлов
app.post('/upload', upload.array('photos', 10), uploadFiles);

// Марширут для получения списка файлов
app.use('/api/post', postRouter);
module.exports = app;
