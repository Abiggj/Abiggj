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

  const mockPosts = [
    {
      id: 1,
      title: "Setting Up a Complete CI/CD Pipeline with Jenkins and Docker",
      content: "In this comprehensive guide, we'll walk through setting up a complete CI/CD pipeline using Jenkins and Docker. This setup will automate your deployment process and ensure consistent deployments across environments...",
      category: "DevOps",
      tags: ["Jenkins", "Docker", "CI/CD", "Automation"],
      date: "2025-06-01",
      author: "DevOps Engineer"
    },
    {
      id: 2,
      title: "Kubernetes Best Practices: Security and Performance",
      content: "Kubernetes has become the de facto standard for container orchestration. However, with great power comes great responsibility. In this post, we'll explore essential security and performance best practices...",
      category: "Kubernetes",
      tags: ["Kubernetes", "Security", "Performance", "Best Practices"],
      date: "2025-05-28",
      author: "DevOps Engineer"
    },
    {
      id: 3,
      title: "Infrastructure as Code with Terraform: Advanced Patterns",
      content: "Terraform has revolutionized how we manage infrastructure. Moving beyond basic configurations, let's explore advanced patterns and best practices for large-scale infrastructure management...",
      category: "Infrastructure",
      tags: ["Terraform", "IaC", "AWS", "Infrastructure"],
      date: "2025-05-25",
      author: "DevOps Engineer"
    },
    {
      id: 4,
      title: "Monitoring Microservices: Prometheus and Grafana Setup",
      content: "Monitoring microservices can be challenging due to their distributed nature. In this guide, we'll set up a comprehensive monitoring solution using Prometheus and Grafana...",
      category: "Monitoring",
      tags: ["Prometheus", "Grafana", "Monitoring", "Microservices"],
      date: "2025-05-22",
      author: "DevOps Engineer"
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/blog');
      setPosts(response.data.posts || response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setPosts(mockPosts); // fallback
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(mockPosts.map(post => post.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
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
