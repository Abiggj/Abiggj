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
    category: '',
    tags: '',
    author:'abiggj',
    status: 'draft',
    featuredImage: ''
  });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // Ensure axios has the auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchPosts();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/posts', {
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
      author: formData.author || user?.username || 'anonymous',
      tags: formData.tags.split(',').map(tag => tag.trim())
    };

    if (editingPost) {
      await axios.put(`http://localhost:5000/api/admin/posts/${editingPost._id}`, postData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:5000/api/admin/posts', postData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      author: 'abiggj',
      status: 'draft',
      featuredImage: ''
    });
    setEditingPost(null);
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
      category: post.category || '',
      tags: (post.tags || []).join(', '),
      status: post.status,
      author: post.author,
      featuredImage: post.featuredImage || ''
    });
    setEditingPost(post);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/posts/${postId}`, {
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
        <h1>Admin Panel</h1>
        <div className="admin-user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-form">
          <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Excerpt:</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                placeholder="Technology, Lifestyle, etc."
              />
            </div>

            <div className="form-group">
              <label>Content:</label>
              <div className="editor-toolbar">
                <button type="button" onClick={() => insertFormatting('bold')} title="Bold">
                  <strong>B</strong>
                </button>
                <button type="button" onClick={() => insertFormatting('italic')} title="Italic">
                  <em>I</em>
                </button>
                <button type="button" onClick={() => insertFormatting('h1')} title="Heading 1">
                  H1
                </button>
                <button type="button" onClick={() => insertFormatting('h2')} title="Heading 2">
                  H2
                </button>
                <button type="button" onClick={() => insertFormatting('h3')} title="Heading 3">
                  H3
                </button>
                <button type="button" onClick={() => insertFormatting('p')} title="Paragraph">
                  P
                </button>
                <button type="button" onClick={() => insertFormatting('link')} title="Link">
                  🔗
                </button>
                <button type="button" onClick={() => insertFormatting('ul')} title="Bullet List">
                  • List
                </button>
                <button type="button" onClick={() => insertFormatting('ol')} title="Numbered List">
                  1. List
                </button>
              </div>
              <textarea
                id="content-editor"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows="15"
                required
                placeholder="Enter your blog post content here. You can use HTML tags or use the toolbar buttons above."
                className="content-textarea"
              />
              <div className="editor-preview">
                <strong>Preview:</strong>
                <div 
                  className="preview-content" 
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma-separated):</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="React, JavaScript, Web Development"
              />
            </div>

            <div className="form-group">
              <label>Featured Image URL:</label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
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

            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
              </button>
              {editingPost && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingPost(null);
                    setFormData({
                      title: '',
                      content: '',
                      excerpt: '',
                      category: '',
                      tags: '',
                      status: 'draft',
                      featuredImage: ''
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="posts-list">
          <h2>Existing Posts</h2>
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post._id} className="post-card">
                  <h3>{post.title}</h3>
                  <p className="post-summary">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className={`status ${post.status}`}>{post.status}</span>
                    <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="post-actions">
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
