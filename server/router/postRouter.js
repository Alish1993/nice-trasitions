const { Router } = require('express');
const { Post } = require('../db/models');
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = Router();

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
  if (!req.files || req.files.length === 0) { // Обновленная проверка
    return res.status(400).json({ message: 'No files uploaded.' }); // Возвращаем JSON при ошибке
  }
  res.json({ message: 'Files uploaded successfully.' }); // Возвращаем JSON при успехе
};

// Маршрут для загрузки файлов
router.post('/upload', upload.array('photos', 10), uploadFiles);

router
  .route('/')
  .get(async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: 'Error postFind' });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, img } = req.body;
      const post = await Post.create({ title, img });
      res.json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Error postCreate' });
    }
  });

router
  .route('/:id') // Исправлено на правильный путь
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      res.json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Error postFindOne' });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, img } = req.body;
      const post = await Post.update({ title, img }, { where: { id } });
      res.json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Error postUpdate' });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id } });
      res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: 'Error postDelete' });
    }
  });

// Делаем папку 'uploads' доступной для статических файлов
const uploadDirectory = express.static(path.join(__dirname, '../uploads'));

module.exports = {
  upload,
  uploadDirectory,
  uploadFiles,
  router, // Добавьте router к экспорту
};
