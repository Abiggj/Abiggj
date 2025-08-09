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

  // Mock data for development (remove when backend is ready)
  const mockPosts = {
  };

  const mockRelatedPosts = [
  ];

  useEffect(() => {
    fetchPost();
    fetchRelatedPosts();
  }, [id]);

const fetchPost = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`${process.env.REACT_APP_API}/api/blog/posts/${id}`);
    setPost(response.data.post);
    console.log(response.data.post)
    setLoading(false); // ✅ done after successful fetch
  } catch (err) {
    setError('Failed to fetch blog post');
    setLoading(false);
    console.error('Error fetching post:', err);
  }
};


  const fetchRelatedPosts = async () => {
    try {
      // TODO: Replace with actual API call when backend is ready
      setRelatedPosts(mockRelatedPosts);
    } catch (err) {
      console.error('Error fetching related posts:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} style={{ marginTop: '2rem', marginBottom: '1rem' }}>{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} style={{ marginTop: '2rem', marginBottom: '1rem' }}>{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>{line.substring(4)}</h3>;
        }
        if (line.startsWith('```')) {
          return null; // Handle code blocks separately if needed
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} style={{ marginBottom: '1rem' }}>{line}</p>;
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p style={{ marginTop: '1rem' }}>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 style={{ color: '#e74c3c' }}>Error</h2>
        <p>{error}</p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/blog" className="btn">Back to Blog</Link>
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline"
            style={{ marginLeft: '1rem' }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Post not found</h2>
        <Link to="/blog" className="btn">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem', color: '#666' }}>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>Home</Link>
        {' > '}
        <Link to="/blog" style={{ color: '#3498db', textDecoration: 'none' }}>Blog</Link>
        {' > '}
        <span>{post.title}</span>
      </nav>

      {/* Post Header */}
      <article className="card" style={{ marginBottom: '3rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#666',
              background: '#f8f9fa',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              {post.category}
            </span>
          </div>
          
          <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{post.title}</h1>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '2rem',
            color: '#666',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            <span>By {post.author}</span>
            <span>{formatDate(post.date)}</span>
            <span>{post.readTime}</span>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {post.tags.map(tag => (
              <span 
                key={tag}
                style={{
                  fontSize: '0.8rem',
                  background: '#e3f2fd',
                  color: '#1976d2',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Post Content */}
        <div style={{ 
          lineHeight: '1.8',
          fontSize: '1.1rem'
        }}>
          {formatContent(post.content)}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '2rem' }}>Related Posts</h2>
          <div className="grid grid-2">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="card">
                <span style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  background: '#f8f9fa',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {relatedPost.category}
                </span>
                <h3 style={{ margin: '1rem 0' }}>
                  <Link 
                    to={`/blog/${relatedPost.id}`}
                    style={{ textDecoration: 'none', color: '#2c3e50' }}
                  >
                    {relatedPost.title}
                  </Link>
                </h3>
                <Link 
                  to={`/blog/${relatedPost.id}`}
                  className="btn"
                  style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem 0',
        borderTop: '2px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-outline"
        >
          ← Go Back
        </button>
        <Link to="/blog" className="btn">View All Posts</Link>
      </div>
    </div>
  );
};

export default BlogPost;
