const { Router } = require('express');
const { Post } = require('../db/models');

const router = Router();

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
      const { title, img, user_id } = req.body;
      const post = await Post.create({ title, img, user_id });
      res.json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Error postCreate' });
    }
  });

router
  .route(':/id')
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
      const post = await Post.destroy({ where: { id } });
      res.sendStatus(200);
    } catch (error) {
      return res.status(500).json({ message: 'Error postDelete' });
    }
  });


  module.exports = router;