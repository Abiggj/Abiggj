import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import '../styles/blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'AWS',
    'GCP',
    'DevOps',
    'GoLang',
    'CI/CD',
    'Python',
    'DSA',
    'SQL',
    'Fun',
    'AI/ML',
    'New Technologies'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/api/blog/`);
      setPosts(response.data.posts || response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="centered-block">
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem' }}>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-block">
        <h2 style={{ color: '#e74c3c' }}>Error</h2>
        <p>{error}</p>
        <button onClick={fetchPosts} className="btn" style={{ marginTop: '1rem' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="blog-section">
      <div className="blog-header">
        <h1>My Personal Blog</h1>
        <p>
          Sharing insights, tutorials, and best practices from the world of DevOps, 
          cloud infrastructure, and automation.
        </p>
      </div>

      <div className="card filter-card">
        <div className="filter-controls">
          <div style={{ flex: '1' }}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-category"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="centered-block">
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <>
          <div className="post-count">
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </div>
          
          <div className="grid grid-2">
            {filteredPosts.map(post => (
              <BlogCard key={post._id || post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
