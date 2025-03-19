const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/create', async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = new Post({ user: "User1", content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/like/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/comment/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { comment } = req.body;
    post.comments.push({ username: "User1", comment });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;

