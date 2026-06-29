import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { token, user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'AWS',
    tags: '',
    status: 'draft',
    featuredImage: ''
  });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('manage');

  const categories = [
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
    if (token) {
      // Ensure axios has the auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchPosts();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/admin/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(response.data.posts || response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')     // Remove non-word characters
      .trim()
      .replace(/\s+/g, '-');        // Replace spaces with hyphens

    const postData = {
      ...formData,
      slug,
      author: user._id, // Send the user's ID
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    if (editingPost) {
      await axios.put(`${process.env.REACT_APP_API}/api/admin/posts/${editingPost._id}`, postData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } else {
      await axios.post(`${process.env.REACT_APP_API}/api/admin/posts`, postData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'AWS',
      tags: '',
      status: 'draft',
      featuredImage: ''
    });
    setEditingPost(null);
    setActiveTab('manage');
    fetchPosts();
  } catch (error) {
    console.error('Create post error:', error);
  } finally {
    setLoading(false);
  }
};


  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      category: post.category || 'AWS',
      tags: (post.tags || []).join(', '),
      status: post.status,
      featuredImage: post.featuredImage || ''
    });
    setEditingPost(post);
    setActiveTab('create');
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API}/api/admin/posts/${postId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const insertFormatting = (tag) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let newText;
    switch(tag) {
      case 'bold':
        newText = `<strong>${selectedText || 'Bold text'}</strong>`;
        break;
      case 'italic':
        newText = `<em>${selectedText || 'Italic text'}</em>`;
        break;
      case 'h1':
        newText = `<h1>${selectedText || 'Heading 1'}</h1>`;
        break;
      case 'h2':
        newText = `<h2>${selectedText || 'Heading 2'}</h2>`;
        break;
      case 'h3':
        newText = `<h3>${selectedText || 'Heading 3'}</h3>`;
        break;
      case 'p':
        newText = `<p>${selectedText || 'Paragraph text'}</p>`;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        newText = url ? `<a href="${url}">${selectedText || 'Link text'}</a>` : selectedText;
        break;
      case 'ul':
        newText = `<ul><li>${selectedText || 'List item'}</li></ul>`;
        break;
      case 'ol':
        newText = `<ol><li>${selectedText || 'List item'}</li></ol>`;
        break;
      default:
        newText = selectedText;
    }
    
    const updatedContent = beforeText + newText + afterText;
    setFormData({...formData, content: updatedContent});
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          <span>Welcome, <strong>{user?.username}</strong></span>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('manage');
            setEditingPost(null);
            setFormData({
              title: '',
              content: '',
              excerpt: '',
              category: 'AWS',
              tags: '',
              status: 'draft',
              featuredImage: ''
            });
          }}
        >
          📁 Manage Posts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          {editingPost ? '✏️ Edit Post' : '➕ Create Post'}
        </button>
      </div>
      
      <div className="admin-content-single">
        {activeTab === 'manage' ? (
          <div className="posts-list">
            <div className="posts-list-header">
              <h2>Existing Posts</h2>
              <span className="posts-count-badge">{posts.length} posts</span>
            </div>
            {posts.length === 0 ? (
              <p className="no-posts-msg">No posts found. Get started by writing a new one!</p>
            ) : (
              <div className="posts-grid-modern">
                {posts.map(post => (
                  <div key={post._id} className="post-card-modern">
                    <div className="post-card-header">
                      <span className={`status-badge ${post.status}`}>{post.status}</span>
                      <span className="post-date-badge">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p className="post-excerpt-preview">{post.excerpt}</p>
                    <div className="post-card-footer">
                      <span className="post-category-badge">{post.category}</span>
                      <div className="post-card-actions">
                        <button onClick={() => handleEdit(post)} className="edit-action-btn">Edit</button>
                        <button onClick={() => handleDelete(post._id)} className="delete-action-btn">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="admin-editor-layout">
            {/* Left Column: Editor Inputs */}
            <div className="editor-inputs-pane">
              <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    placeholder="e.g. Mastering Docker Containers"
                  />
                </div>

                <div className="form-group">
                  <label>Excerpt:</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows="2"
                    required
                    placeholder="Short description of the post..."
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Category:</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Content:</label>
                  <div className="editor-toolbar">
                    <button type="button" onClick={() => insertFormatting('bold')} title="Bold"><strong>B</strong></button>
                    <button type="button" onClick={() => insertFormatting('italic')} title="Italic"><em>I</em></button>
                    <button type="button" onClick={() => insertFormatting('h1')} title="Heading 1">H1</button>
                    <button type="button" onClick={() => insertFormatting('h2')} title="Heading 2">H2</button>
                    <button type="button" onClick={() => insertFormatting('h3')} title="Heading 3">H3</button>
                    <button type="button" onClick={() => insertFormatting('p')} title="Paragraph">P</button>
                    <button type="button" onClick={() => insertFormatting('link')} title="Link">🔗</button>
                    <button type="button" onClick={() => insertFormatting('ul')} title="Bullet List">• List</button>
                    <button type="button" onClick={() => insertFormatting('ol')} title="Numbered List">1. List</button>
                  </div>
                  <textarea
                    id="content-editor"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="14"
                    required
                    placeholder="Enter blog post content. You can write HTML tags or format using the toolbar above."
                    className="content-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>Tags (comma-separated):</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="Docker, Containers, DevOps, Guide"
                  />
                </div>

                <div className="form-group">
                  <label>Featured Image URL:</label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Publish Post')}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setEditingPost(null);
                      setFormData({
                        title: '',
                        content: '',
                        excerpt: '',
                        category: 'AWS',
                        tags: '',
                        status: 'draft',
                        featuredImage: ''
                      });
                      setActiveTab('manage');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Article Preview */}
            <div className="editor-preview-pane">
              <div className="modern-article-preview">
                <div className="preview-meta">
                  <span className="preview-category">{formData.category}</span>
                  <span className={`status-badge ${formData.status}`}>{formData.status}</span>
                </div>
                
                <h1 className="preview-title">{formData.title || 'Untitled Post'}</h1>
                
                {formData.featuredImage && (
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured Preview" 
                    className="preview-featured-image" 
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                
                {formData.excerpt && (
                  <p className="preview-excerpt">{formData.excerpt}</p>
                )}
                
                <div 
                  className="preview-body" 
                  dangerouslySetInnerHTML={{ 
                    __html: formData.content || '<em>Start typing in the editor to see your live preview...</em>' 
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
