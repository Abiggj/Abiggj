import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <article className="card">
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
      
      <h3 style={{ marginBottom: '0.5rem' }}>
        <Link 
          to={`/blog/${post._id || post.id}`}
          style={{ 
            textDecoration: 'none', 
            color: '#2c3e50',
            transition: 'color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#3498db'}
          onMouseOut={(e) => e.target.style.color = '#2c3e50'}
        >
          {post.title}
        </Link>
      </h3>
      
      <p style={{ 
        color: '#666', 
        fontSize: '0.9rem', 
        marginBottom: '1rem' 
      }}>
        {formatDate(post.createdAt || post.date)}
      </p>
      
      <p style={{ marginBottom: '1.5rem' }}>
        {truncateContent(post.content || post.excerpt)}
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {post.tags && post.tags.map(tag => (
          <span 
            key={tag}
            style={{
              fontSize: '0.8rem',
              background: '#e3f2fd',
              color: '#1976d2',
              padding: '2px 6px',
              borderRadius: '12px'
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <Link 
        to={`/blog/${post._id || post.id}`}
        className="btn"
        style={{ fontSize: '0.9rem', padding: '8px 16px' }}
      >
        Read More
      </Link>
    </article>
  );
};

export default BlogCard;
