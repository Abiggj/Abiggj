const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostBySlug,
  getAllPostsAdmin,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getTags,
  likePost
} = require('../controllers/blogController');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Public routes
router.get('/', getAllPosts);
router.get('/categories', getCategories);
router.get('/posts/:id', getPostById);
router.get('/tags', getTags);
router.get('/posts/:id', getPostById),
router.get('/slug/:slug', getPostBySlug);
router.post('/like/:slug', likePost);

// Admin routes (require authentication and admin role)
router.get('/admin', auth, admin, getAllPostsAdmin);
router.get('/admin/:id', auth, admin, getPostById);
router.post('/admin', auth, admin, createPost);
router.put('/admin/:id', auth, admin, updatePost);
router.delete('/admin/:id', auth, admin, deletePost);

module.exports = router;
