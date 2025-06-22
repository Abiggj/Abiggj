import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaBrain, FaChartLine, FaFileAlt, FaMobile } from 'react-icons/fa';
import { SiPython, SiJavascript, SiGo, SiTensorflow, SiReact, SiOpencv, SiSelenium } from 'react-icons/si';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <div className="project-icon" style={{ background: project.color }}>
                  {project.icon}
                </div>
                <div className="project-title">
                  <h3>{project.name}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <div className="project-links">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link github"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>

              <div className="project-description">
                <p>{project.description}</p>
                <div className="achievement-badge">
                  <FaRocket />
                  <span>{project.achievements}</span>
                </div>
              </div>

              <div className="project-languages">
                <h4>Languages</h4>
                <div className="language-bars">
                  {Object.entries(project.languages).map(([lang, percentage]) => (
                    <div key={lang} className="language-item">
                      <div className="language-header">
                        <span className="language-name">{lang}</span>
                        <span className="language-percentage">{percentage}%</span>
                      </div>
                      <div className="language-bar">
                        <div 
                          className="language-progress" 
                          style={{ 
                            width: `${percentage}%`,
                            background: getTechColor(lang)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-technologies">
                <h4>Technologies</h4>
                <div className="tech-stack">
                  {project.technologies.slice(0, 6).map((tech, techIndex) => (
                    <div 
                      key={techIndex} 
                      className="tech-item"
                      style={{ color: getTechColor(tech) }}
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
                  ))}
                  {project.technologies.length > 6 && (
                    <div className="tech-more">
                      +{project.technologies.length - 6} more
                    </div>
                  )}
                </div>
              </div>

              <div className="project-features">
                <h4>Key Features</h4>
                <ul>
                  {project.features.slice(0, 4).map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                  {project.features.length > 4 && (
                    <li className="feature-more">
                      +{project.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              <div className="project-footer">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-project-btn"
                >
                  <FaExternalLinkAlt />
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub Profile Section */}
      <section className="github-section">
        <div className="container">
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
