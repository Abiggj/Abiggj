import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaServer, FaNetworkWired, FaDatabase, FaPaw, FaExternalLinkAlt, FaTerminal, FaCode, FaCloud, FaBrain, FaCogs, FaPenNib, FaBox } from 'react-icons/fa';
import { SiAmazonwebservices, SiGooglecloud, SiDocker, SiKubernetes, SiPython, SiGoland, SiJavascript, SiPostgresql, SiMongodb, SiTensorflow, SiJira } from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";

const heroRoles = [
  { text: 'DevOps Engineer', icon: <FaTerminal /> },
  { text: 'Software Developer', icon: <FaCode /> },
  { text: 'Cloud Practitioner', icon: <FaCloud /> },
  { text: 'AI & ML Enthusiast', icon: <FaBrain /> },
  { text: 'Site Reliability Engineer', icon: <FaServer /> },
  { text: 'Automation Engineer', icon: <FaCogs /> },
  { text: 'Open Source Contributor', icon: <FaGithub /> },
  { text: 'Tech Content Writer', icon: <FaPenNib /> },
  { text: 'Containerization Specialist', icon: <FaBox /> },
  { text: 'Golang Developer', icon: <FaTerminal /> }
];

const phrases = heroRoles.map(role => role.text);

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const typeSpeed = 65;
    const deleteSpeed = 30;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Backspacing/deleting
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        // Typing
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        
        if (typedText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, currentPhraseIndex, isDeleting]);

  const skills = [
    { icon: <SiAmazonwebservices />, name: 'AWS', color: '#FF9900' },
    { icon: <SiGooglecloud />, name: 'GCP', color: '#1a73e8' },
    { icon: <VscAzure />, name: 'Azure', color: '#0078D4' },
    { icon: <SiDocker />, name: 'Docker', color: '#2496ED' },
    { icon: <SiKubernetes />, name: 'Kubernetes', color: '#326CE5' },
    { icon: <SiPython />, name: 'Python', color: '#3776AB' },
    { icon: <SiGoland />, name: 'Golang', color: '#00ADD8' },
    { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
    { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#336791' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
    { icon: <SiTensorflow />, name: 'TensorFlow', color: '#FF6F00' },
    { icon: <SiJira />, name: 'Jira', color: '#0052CC' }
  ];

  const publications = [
    {
      title: 'Distance Analysis and Dimensionality Reduction using PCA on Brain Tumor MRI Scans',
      venue: 'EAI MLADA',
      date: 'Nov 2023',
      link: 'https://publications.eai.eu/index.php/phat/article/view/5632',
      tags: ['PCA', 'MRI Scans', 'Brain Tumor', 'Dimensionality Reduction']
    },
    {
      title: 'Comparison of Clustering Algorithms for Segregating Planar Sections of Brain MRIs',
      venue: 'MIT-SocICon',
      date: 'Apr 2024',
      link: 'https://ieeexplore.ieee.org/document/10575146',
      tags: ['Clustering', 'MRI Sections', 'Algorithms Comparison', 'Image Segmentation']
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'hero-animate' : ''}`}>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Aniket Jhariya</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="typing-text">{typedText}</span>
            </h2>
            <p className="hero-description">
              DevOps Intern at Diacto Technologies with hands-on experience in AWS, Docker, and CI/CD pipelines. 
              B.Tech in AI & ML from Symbiosis Institute of Technology. Contributor to scalable cloud infrastructure and AI-integrated systems.
            </p>

            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                <FaEnvelope /> Get In Touch
              </Link>
              <a href="/Aniket_Jhariya_Resume.pdf" className="btn btn-secondary" download>
                <FaDownload /> Download CV
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com/abiggj" target="_blank" rel="noopener noreferrer" className="social-link github">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/aniket-jhariya" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <FaLinkedin />
              </a>
              <a href="mailto:aniket.jhariya@gmail.com" className="social-link email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="floating-card">
              <div className="profile-placeholder">
                <div key={currentPhraseIndex} className="profile-icon animate-icon">
                  {heroRoles[currentPhraseIndex].icon}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <a href="#skills" className="scroll-down">
          <span>Scroll Down</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </a>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="home-container">
          <h3 className="section-title">Tech Stack</h3>
          <div className="skills-grid-home">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-preview">
        <div className="home-container">
          <h3 className="section-title">Featured Projects</h3>
          <div className="home-projects-grid">
            <Link to="/projects" className="home-project-card">
              <div className="home-project-icon">
                <FaNetworkWired />
              </div>
              <h4>CandidHR</h4>
              <p>AI-powered recruitment platform. Deployed using ECS Fargate and CI/CD automation. Managed Dockerized backend and frontend, including DB migration from MySQL to PostgreSQL.</p>
              <div className="home-project-tech">
                <span>Django</span>
                <span>React</span>
                <span>AWS</span>
                <span>PostgreSQL</span>
              </div>
            </Link>

            <Link to="/projects" className="home-project-card">
              <div className="home-project-icon">
                <FaDatabase />
              </div>
              <h4>BlissIQ</h4>
              <p>EduTech platform for regional language learners. Focused on secure RDS connectivity, ECS automation and scalable VPC setup using AWS tools and CodeBuild pipelines.</p>
              <div className="home-project-tech">
                <span>AWS</span>
                <span>Docker</span>
                <span>VPC</span>
                <span>CI/CD</span>
              </div>
            </Link>

            <Link to="/projects" className="home-project-card">
              <div className="home-project-icon">
                <FaPaw />
              </div>
              <h4>Pawwp</h4>
              <p>Social media platform for pets featuring a Go backend (gorilla/mux, MongoDB, Google Drive) and a React Native mobile application, integrated with a predictive GAN pipeline.</p>
              <div className="home-project-tech">
                <span>Go</span>
                <span>React Native</span>
                <span>MongoDB</span>
                <span>GAN</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="publications-section">
        <div className="home-container">
          <h3 className="section-title">Publications</h3>
          <div className="publications-grid-modern">
            {publications.map((publication, index) => (
              <a 
                key={index} 
                href={publication.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="publication-card-modern"
              >
                <div className="publication-header-modern">
                  <span className="pub-badge-date">{publication.date}</span>
                  <span className="pub-badge-venue">{publication.venue}</span>
                </div>
                
                <h4 className="pub-title-modern">{publication.title}</h4>
                
                <div className="pub-tags">
                  {publication.tags.map((tag, i) => (
                    <span key={i} className="pub-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="pub-footer-modern">
                  <span className="pub-link-text">Read Publication</span>
                  <FaExternalLinkAlt className="pub-link-icon" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
