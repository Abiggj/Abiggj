import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaBrain, FaChartLine, FaFileAlt, FaMobile, FaPaw } from 'react-icons/fa';
import { SiPython, SiJavascript, SiGo, SiTensorflow, SiReact, SiOpencv, SiSelenium } from 'react-icons/si';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Craftrade',
      category: 'AI/ML',
      description: 'A sophisticated simulation tool designed to operate on financial OHLCV time series data and corresponding news headlines using neural networks, NLP, and LSTM networks',
      longDescription: 'Advanced financial market simulation combining neural networks, NLP, and LSTM for market prediction. Features generative adversarial networks for synthetic financial data generation and sentiment analysis of market news.',
      technologies: ['Python', 'TensorFlow', 'LSTM', 'NLP', 'GAN', 'Yahoo Finance API', 'Selenium', 'Pandas', 'NumPy', 'NLTK'],
      languages: { 'Python': 96.1, 'Jupyter Notebook': 3.8, 'Shell': 0.1 },
      features: [
        'Neural Networks and LSTM Networks implementation',
        'Natural Language Processing for sentiment analysis',
        'Generative Adversarial Network (GAN) for data generation',
        'Web scraping of financial news and data',
        'Yahoo Finance and Economic Times integration',
        'Stock market prediction with 75% accuracy',
        'Real-time market sentiment analysis'
      ],
      icon: <FaChartLine />,
      color: '#ff6b6b',
      githubUrl: 'https://github.com/Abiggj/Craftrade',
      achievements: '75% accuracy in market prediction'
    },
    {
      id: 2,
      name: 'TrulyPresent',
      category: 'Computer Vision',
      description: 'Computer vision application using neural networks for automated classroom attendance with 80% efficiency improvement',
      longDescription: 'Innovative attendance management system leveraging computer vision and neural networks to automate classroom attendance tracking. Built with mobile-first approach using React Native.',
      technologies: ['TensorFlow', 'OpenCV', 'React Native', 'Python', 'JavaScript', 'Neural Networks', 'Computer Vision'],
      languages: { 'JavaScript': 66.1, 'Python': 33.9 },
      features: [
        'Computer vision technology for face recognition',
        'Automated classroom attendance tracking',
        'Neural network-based identification system',
        'Cross-platform mobile application',
        '80% efficiency improvement over manual systems',
        'Real-time processing capabilities',
        'Secure student data management'
      ],
      icon: <FaBrain />,
      color: '#4ecdc4',
      githubUrl: 'https://github.com/Abiggj/TrulyPresent',
      achievements: '80% efficiency improvement'
    },
    {
      id: 3,
      name: 'Structura',
      category: 'DevOps/Tools',
      description: 'Terminal User Interface (TUI) based Go application that automatically generates Markdown documentation for any project directory using DeepSeek AI API',
      longDescription: 'Modern CLI tool built in Go that revolutionizes project documentation. Uses AI to analyze codebases and generate comprehensive Markdown documentation automatically.',
      technologies: ['Go', 'BubbleTea', 'DeepSeek AI API', 'Markdown', 'TUI', 'Lipgloss', 'Resty'],
      languages: { 'Go': 100 },
      features: [
        'Terminal User Interface using BubbleTea framework',
        'AI-powered documentation generation via DeepSeek API',
        'Recursive directory analysis and file parsing',
        'Automatic Markdown documentation output',
        'Customizable ignore patterns for files/directories',
        'Progress tracking with visual indicators',
        'Cross-platform compatibility (Go 1.16+)',
        'Beautiful terminal styling with Lipgloss'
      ],
      icon: <FaFileAlt />,
      color: '#45b7d1',
      githubUrl: 'https://github.com/Abiggj/Structura',
      achievements: 'AI-powered automation'
    },
    {
      id: 4,
      name: 'Re-dot',
      category: 'Web/Mobile',
      description: 'Reddit app for viewing feeds, posts and submissions. Works as a combination of Tinder and Reddit with swipe-based interactions',
      longDescription: 'Innovative Reddit client that gamifies social media consumption by combining Reddit\'s content richness with Tinder\'s intuitive swipe interface. Built with Python and PyQt5.',
      technologies: ['Python', 'PyQt5', 'Reddit API', 'PRAW', 'Selenium', 'Cryptography', 'Qt Framework'],
      languages: { 'Python': 100 },
      features: [
        'Swipe-based interface (Tinder-style interaction)',
        'Reddit API integration via PRAW library',
        'PyQt5 for modern desktop UI framework',
        'Multiple post sorting options (Hot, New, Rising, Controversial)',
        'Native upvote/downvote functionality',
        'Integrated image display and media support',
        'Direct commenting system',
        'Secure credential storage using Cryptography',
        'Browser automation capabilities with Selenium'
      ],
      icon: <FaMobile />,
      color: '#f39c12',
      githubUrl: 'https://github.com/Abiggj/Re-dot',
      achievements: 'Unique UX innovation'
    },
    {
      id: 5,
      name: 'Pawwp',
      category: 'Web/Mobile',
      description: 'A social media platform for pets featuring a Go backend and a React Native mobile application.',
      longDescription: 'A custom-built social media platform specifically tailored for pets and pet owners. Pawwp incorporates a Go backend leveraging MongoDB and Google Drive API for storage, and a React Native mobile application for smooth, native-app interaction. Core features include secure owner/pet profiling, posts and story timelines, and predictive AI/GAN integration.',
      technologies: ['Go', 'MongoDB', 'React Native', 'JavaScript', 'Google Drive API', 'REST API', 'GAN'],
      languages: { 'Go': 45.0, 'JavaScript': 55.0 },
      features: [
        'Secure multi-profile setup (pet owners & pets)',
        'Go-based API backend (gorilla/mux & MongoDB)',
        'Media upload integration with Google Drive API storage',
        'Story and post timeline feeds for pets',
        'Cross-platform mobile application built in React Native',
        'Predictive GAN pipelines for automated content moderation'
      ],
      icon: <FaPaw />,
      color: '#e74c3c',
      githubUrl: 'https://github.com/Abiggj/pawwp',
      achievements: 'Core features implemented'
    }
  ];

  const categories = ['all', 'AI/ML', 'Computer Vision', 'DevOps/Tools', 'Web/Mobile'];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getTechIcon = (tech) => {
    const iconMap = {
      'Python': <SiPython />,
      'JavaScript': <SiJavascript />,
      'Go': <SiGo />,
      'TensorFlow': <SiTensorflow />,
      'React Native': <SiReact />,
      'OpenCV': <SiOpencv />,
      'Selenium': <SiSelenium />
    };
    return iconMap[tech] || <FaCode />;
  };

  const getTechColor = (tech) => {
    const colorMap = {
      'Python': '#3776ab',
      'JavaScript': '#f7df1e',
      'Go': '#00add8',
      'TensorFlow': '#ff6f00',
      'React Native': '#61dafb',
      'OpenCV': '#5c3ee8',
      'Selenium': '#43b02a'
    };
    return colorMap[tech] || '#667eea';
  };

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-content">
          <h1>My Projects</h1>
          <p>A showcase of my technical projects spanning AI/ML, Computer Vision, DevOps, and Web Development</p>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid">
        <div className="project-container">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card compact-project-card"
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
              onClick={() => setActiveProject(project)}
            >
              <div className="project-header">
                <div className="project-icon" style={{ background: project.color }}>
                  {project.icon}
                </div>
                <div className="project-title">
                  <h3>{project.name}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>

              <div className="project-description">
                <p>{project.description}</p>
                <div className="achievement-badge">
                  <FaRocket />
                  <span>{project.achievements}</span>
                </div>
              </div>

              <div className="project-footer">
                <button 
                  className="view-project-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(project);
                  }}
                >
                  <FaExternalLinkAlt />
                  View Details & Stack
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Details Modal */}
      {activeProject && (
        <div className="modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="modal-content project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveProject(null)}>&times;</button>
            
            <div className="modal-header">
              <div className="project-icon" style={{ background: activeProject.color, width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.3rem' }}>
                {activeProject.icon}
              </div>
              <div style={{ marginLeft: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.6rem', color: '#0f172a' }}>{activeProject.name}</h3>
                <span className="project-category" style={{ background: '#3b82f6', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
                  {activeProject.category}
                </span>
              </div>
            </div>
            
            <div className="modal-body">
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                {activeProject.longDescription}
              </p>
              
              <div className="modal-section">
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>Key Features</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeProject.features.map((feature, i) => (
                    <li key={i} style={{ fontSize: '0.95rem' }}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-section" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>Languages</h4>
                <div className="language-bars" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {Object.entries(activeProject.languages).map(([lang, percentage]) => (
                    <div key={lang} className="language-item">
                      <div className="language-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.9rem' }}>
                        <span className="language-name" style={{ fontWeight: 600, color: '#334155' }}>{lang}</span>
                        <span className="language-percentage" style={{ color: '#64748b' }}>{percentage}%</span>
                      </div>
                      <div className="language-bar" style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div 
                          className="language-progress" 
                          style={{ 
                            height: '100%',
                            borderRadius: '3px',
                            width: `${percentage}%`,
                            background: getTechColor(lang)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-section" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>Technologies & Tools</h4>
                <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {activeProject.technologies.map((tech, i) => (
                    <div 
                      key={i} 
                      className="tech-item" 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        background: '#f1f5f9', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '12px', 
                        fontSize: '0.85rem', 
                        fontWeight: 500,
                        color: getTechColor(tech),
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <a 
                href={activeProject.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="view-project-btn"
                style={{ width: 'auto', display: 'inline-flex', padding: '0.6rem 1.5rem', borderRadius: '10px' }}
              >
                <FaGithub /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Profile Section */}
      <section className="github-section">
        <div className="github-container">
          <div className="github-card">
            <FaGithub className="github-icon" />
            <div className="github-content">
              <h3>Explore More Projects</h3>
              <p>Check out my complete portfolio and contributions on GitHub</p>
              <a 
                href="https://github.com/Abiggj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-btn"
              >
                <FaGithub />
                Visit GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
