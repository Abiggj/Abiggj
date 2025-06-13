import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaServer, FaNetworkWired, FaDatabase } from 'react-icons/fa';
import { SiAmazonwebservices, SiGooglecloud, SiDocker, SiKubernetes, SiPython, SiGoland, SiJavascript, SiPostgresql, SiMongodb, SiTensorflow, SiJira } from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
              <span className="typing-text">DevOps Engineer | Cloud & AI Enthusiast</span>
            </h2>
            <p className="hero-description">
              DevOps Intern at Diacto Technologies with hands-on experience in AWS, Docker, and CI/CD pipelines. 
              B.Tech in AI & ML from Symbiosis Institute of Technology. Contributor to scalable cloud infrastructure and AI-integrated systems.
            </p>

            <div className="hero-buttons">
              <a href="/contact" className="btn btn-primary">
                <FaEnvelope /> Get In Touch
              </a>
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
                <div className="profile-icon">
                  <FaServer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h3 className="section-title">Tech Stack</h3>
        <div className="skills-grid">
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
      </section>

      {/* Projects Section */}
      <section className="projects-preview">
        <h3 className="section-title">Projects</h3>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-icon">
              <FaNetworkWired />
            </div>
            <h4>CandidHR</h4>
            <p>AI-powered recruitment platform. Deployed using ECS Fargate and CI/CD automation. Managed Dockerized backend and frontend, including DB migration from MySQL to PostgreSQL.</p>
            <div className="project-tech">
              <span>Django</span>
              <span>React</span>
              <span>AWS</span>
              <span>PostgreSQL</span>
            </div>
          </div>

          <div className="project-card">
            <div className="project-icon">
              <FaDatabase />
            </div>
            <h4>BlissIQ</h4>
            <p>EduTech platform for regional language learners. Focused on secure RDS connectivity, ECS automation and scalable VPC setup using AWS tools and CodeBuild pipelines.</p>
            <div className="project-tech">
              <span>AWS</span>
              <span>Docker</span>
              <span>VPC</span>
              <span>CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="publications-section">
        <h3 className="section-title">Publications</h3>
        <ul className="publication-list">
          <li>
            <strong>Distance Analysis and Dimensionality Reduction using PCA on Brain Tumor MRI Scans</strong><br />
            <a href="https://publications.eai.eu/index.php/phat/article/view/5632" target="_blank" rel="noreferrer">EAI MLADA, Nov 2023</a>
          </li>
          <li>
            <strong>Comparison of Clustering Algorithms for Segregating Planar Sections of Brain MRIs</strong><br />
            <a href="https://ieeexplore.ieee.org/document/10575146" target="_blank" rel="noreferrer">MIT-SocICon, Apr 2024</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
