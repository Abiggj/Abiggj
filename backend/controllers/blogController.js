const BlogPost = require('../models/BlogPost');
const { sanitizeHtml } = require('../utils/sanitize');

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
};

// Helper function to ensure unique slug
const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const existing = await BlogPost.findOne(query);
    if (!existing) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// Get all published blog posts (public)
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const tag = req.query.tag;
    const search = req.query.search;
    
    // Build query
    let query = { status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const posts = await BlogPost.find(query)
      .populate('author', 'username')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude full content for list view
    
    const total = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching posts'
    });
  }
};

// Get single blog post by slug (public)
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({ 
      slug, 
      status: 'published' 
    }).populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Increment view count
    post.metadata.views += 1;
    await post.save();
    
    res.json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching post'
    });
  }
};

// Get all posts for admin (includes drafts)
const getAllPostsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const posts = await BlogPost.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      success: true,
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total
      }
    });
  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching posts'
    });
  }
};

// Get single post by ID (admin)
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post_obj = await BlogPost.findById(id).populate('author', 'username');
    if (!post_obj) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    res.json({
      success: true,
      post: post_obj
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching post'
    });
  }
};

// Create new blog post
const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      featuredImage,
      seo,
      scheduledFor
    } = req.body;

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and category are required'
      });
    }

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required'
      });
    }

    // Sanitize HTML content
    const sanitizedContent = sanitizeHtml(content);

    const postData = {
      title,
      content: sanitizedContent,
      category,
      author: req.user.userId,
      status: status || 'draft',
      ...(excerpt && { excerpt }),
      ...(tags && { tags }),
      ...(featuredImage && { featuredImage }),
      ...(seo && { seo }),
      ...(scheduledFor && { scheduledFor: new Date(scheduledFor) })
    };

    const post = new BlogPost(postData);

    // Handle potential duplicate slug errors
    try {
      await post.save();
    } catch (saveError) {
      if (saveError.code === 11000 && saveError.keyPattern?.slug) {
        // Duplicate slug error - retry with unique slug
        const baseSlug = generateSlug(title);
        const uniqueSlug = await ensureUniqueSlug(baseSlug);
        post.slug = uniqueSlug;
        await post.save();
      } else {
        throw saveError;
      }
    }

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating post'
    });
  }
};

// Update blog post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      category,
      tags,
      status,
      featuredImage,
      seo,
      scheduledFor
    } = req.body;
    
    const post = await BlogPost.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Prepare update data
    const updateData = {
      ...(excerpt && { excerpt }),
      ...(category && { category }),
      ...(tags && { tags }),
      ...(status && { status }),
      ...(featuredImage && { featuredImage }),
      ...(seo && { seo }),
      ...(scheduledFor && { scheduledFor: new Date(scheduledFor) })
    };
    
    // Handle title update (regenerate slug if title changes)
    if (title && title !== post.title) {
      const baseSlug = generateSlug(title);
      const uniqueSlug = await ensureUniqueSlug(baseSlug, id);
      updateData.title = title;
      updateData.slug = uniqueSlug;
    }
    
    // Handle content update (sanitize if provided)
    if (content) {
      updateData.content = sanitizeHtml(content);
    }
    
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username');
    
    res.json({
      success: true,
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating post'
    });
  }
};

// Delete blog post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    await BlogPost.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting post'
    });
  }
};

// Get categories
const getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching categories'
    });
  }
};

// Get tags
const getTags = async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { status: 'published' });
    
    res.json({
      success: true,
      tags
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching tags'
    });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({ slug, status: 'published' });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    post.metadata.likes += 1;
    await post.save();
    
    res.json({
      success: true,
      message: 'Post liked successfully',
      likes: post.metadata.likes
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error liking post'
    });
  }
};

module.exports = {
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
};
