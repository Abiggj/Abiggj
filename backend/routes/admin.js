const express = require('express');
const router = express.Router();
const {
  getAllPostsAdmin,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/blogController');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// All admin routes require authentication and admin role
router.use(auth);
router.use(admin);

// Admin blog post routes
router.get('/posts', getAllPostsAdmin);
router.get('/posts/:id', getPostById);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;