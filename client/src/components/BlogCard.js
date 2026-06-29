import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateContent = (content, maxLength = 120) => {
    if (!content) return '';
    // Strip HTML tags for clean text excerpt
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  const imageUrl = post.featuredImage?.url || (typeof post.featuredImage === 'string' ? post.featuredImage : null);

  return (
    <article className={`blog-card-modern ${imageUrl ? 'has-image' : ''}`}>
      {imageUrl && (
        <div className="blog-card-image">
          <img src={imageUrl} alt={post.featuredImage?.alt || post.title} onError={(e) => e.target.style.display = 'none'} />
        </div>
      )}
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-date">{formatDate(post.createdAt || post.date)}</span>
        </div>
        
        <h3 className="blog-card-title">
          <Link to={`/blog/${post._id || post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="blog-card-excerpt">
          {truncateContent(post.content || post.excerpt)}
        </p>
        
        <div className="blog-card-footer">
          <div className="blog-card-tags">
            {post.tags && post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="blog-card-tag">#{tag}</span>
            ))}
          </div>
          
          <Link to={`/blog/${post._id || post.id}`} className="blog-card-link">
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
