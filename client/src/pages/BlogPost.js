import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const mockRelatedPosts = [];

  useEffect(() => {
    fetchPost();
    fetchRelatedPosts();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/api/blog/posts/${id}`);
      setPost(response.data.post);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog post');
      setLoading(false);
      console.error('Error fetching post:', err);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      setRelatedPosts(mockRelatedPosts);
    } catch (err) {
      console.error('Error fetching related posts:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="centered-block">
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem' }}>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="centered-block">
        <h2 style={{ color: '#e74c3c' }}>Error</h2>
        <p>{error}</p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/blog" className="cancel-btn" style={{ padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>Back to Blog</Link>
          <button 
            onClick={() => navigate(-1)}
            className="submit-btn"
            style={{ padding: '10px 20px', borderRadius: '8px' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="centered-block">
        <h2>Post not found</h2>
        <Link to="/blog" className="cancel-btn" style={{ padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Back to Blog</Link>
      </div>
    );
  }

  const imageUrl = post.featuredImage?.url || (typeof post.featuredImage === 'string' ? post.featuredImage : null);

  return (
    <div className="blog-post-detail-container">
      {/* Breadcrumb */}
      <nav className="blog-breadcrumb">
        <Link to="/">Home</Link>
        <span className="separator">/</span>
        <Link to="/blog">Blog</Link>
        <span className="separator">/</span>
        <span className="current">{post.title}</span>
      </nav>

      {/* Article Block */}
      <article className="blog-article-card">
        {imageUrl && (
          <div className="blog-article-banner">
            <img src={imageUrl} alt={post.featuredImage?.alt || post.title} onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}

        <div className="blog-article-header">
          <span className="blog-article-category">{post.category}</span>
          <h1 className="blog-article-title">{post.title}</h1>
          
          <div className="blog-article-author-info">
            <span className="author-name">By {post.author?.username || 'abiggj'}</span>
            <span className="dot">•</span>
            <span className="publish-date">{formatDate(post.createdAt || post.date)}</span>
            {post.readTime && (
              <>
                <span className="dot">•</span>
                <span className="read-time">{post.readTime}</span>
              </>
            )}
          </div>

          <div className="blog-article-tags">
            {post.tags && post.tags.map(tag => (
              <span key={tag} className="blog-article-tag">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div 
          className="blog-article-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="related-posts-section">
          <h2>Related Posts</h2>
          <div className="blog-posts-grid-modern">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="blog-card-modern">
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-category">{relatedPost.category}</span>
                  </div>
                  <h3 className="blog-card-title">
                    <Link to={`/blog/${relatedPost.id}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <Link to={`/blog/${relatedPost.id}`} className="blog-card-link">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="blog-article-navigation">
        <button onClick={() => navigate(-1)} className="back-btn-modern">
          ← Go Back
        </button>
        <Link to="/blog" className="all-posts-btn-modern">
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
