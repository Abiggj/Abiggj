import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for development (remove when backend is ready)
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
      // Fallback to mock data if API fails
      setPosts(mockPosts);
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(mockPosts.map(post => post.category))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
        <p style={{ marginTop: '1rem' }}>Loading blog posts...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 style={{ color: '#e74c3c' }}>Error</h2>
        <p>{error}</p>
        <button 
          onClick={fetchPosts}
          className="btn"
          style={{ marginTop: '1rem' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1>DevOps Blog</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Sharing insights, tutorials, and best practices from the world of DevOps, 
          cloud infrastructure, and automation.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem',
                background: 'white'
              }}
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

      {/* Blog Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem', color: '#666' }}>
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
