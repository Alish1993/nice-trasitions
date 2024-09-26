const express = require('express');
const multer = require('multer');
const path = require('path');

// Делаем папку 'uploads' доступной для статических файлов
const uploadDirectory = express.static(path.join(__dirname, '../uploads'));

// Настраиваем Multer для сохранения файлов в директорию 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Генерация уникального имени файла
  },
});

const upload = multer({ storage: storage });

// Обработчик для загрузки файлов
const uploadFiles = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No files uploaded.' }); // Возвращаем JSON при ошибке
  }
  res.json({ message: 'Files uploaded successfully.' }); // Возвращаем JSON при успехе
};

module.exports = {
  upload,
  uploadDirectory,
  uploadFiles,
};
