import React, { useState } from 'react';
import { FaGraduationCap, FaBriefcase, FaAward, FaCode, FaCloud, FaDatabase, FaTools, FaBook, FaAward as FaAwardIcon, FaExternalLinkAlt } from 'react-icons/fa';
import { SiAmazonwebservices, SiDocker, SiKubernetes, SiPython, SiJavascript, SiGo, SiMysql, SiPostgresql, SiMongodb } from 'react-icons/si';

const About = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const skills = {
    cloud: [
      { name: 'AWS', icon: <SiAmazonwebservices />, level: 90, levelText: 'Expert', desc: 'Expertise in provisioning scalable infrastructure, including ECS Fargate, RDS databases, VPC networking, IAM security policies, and CodeBuild automated deployment pipelines.', projects: 'CandidHR, BlissIQ' },
      { name: 'GCP', icon: <FaCloud />, level: 75, levelText: 'Proficient', desc: 'Experience deploying containers to Cloud Run, managing Google Cloud Build processes, and configuring Artifact Registry for secure image storage.', projects: 'Portfolio Web' },
      { name: 'Azure', icon: <FaCloud />, level: 70, levelText: 'Intermediate', desc: 'Basic knowledge of virtual machines, Azure Container Instances, and resource groups.', projects: 'Academic Projects' }
    ],
    devops: [
      { name: 'Docker', icon: <SiDocker />, level: 85, levelText: 'Advanced', desc: 'Proficient in containerizing Node.js and Django applications, writing clean multi-stage Dockerfiles, managing Docker networks/volumes, and optimizing image size.', projects: 'CandidHR, BlissIQ, Pawwp' },
      { name: 'Kubernetes', icon: <SiKubernetes />, level: 80, levelText: 'Advanced', desc: 'Experience with Kubernetes deployments, services, ingress routing, and config maps for orchestrating containerized microservices.', projects: 'Personal Labs' },
      { name: 'CI/CD', icon: <FaTools />, level: 85, levelText: 'Advanced', desc: 'Deep understanding of continuous integration and continuous deployment pipelines using AWS CodeBuild/CodePipeline and GitHub Actions.', projects: 'CandidHR, BlissIQ' },
      { name: 'Linux', icon: <FaCode />, level: 90, levelText: 'Expert', desc: 'Advanced command-line proficiency, shell scripting (Bash), environment configurations, user permissions, and system administration.', projects: 'All Projects' }
    ],
    programming: [
      { name: 'Python', icon: <SiPython />, level: 90, levelText: 'Expert', desc: 'Extensive scripting experience, data analysis, deep learning (TensorFlow), web backend development (Django, Flask, PyQt5).', projects: 'Craftrade, TrulyPresent, Re-dot' },
      { name: 'JavaScript', icon: <SiJavascript />, level: 85, levelText: 'Advanced', desc: 'Full-stack development experience, including React, React Native, and Node.js/Express.', projects: 'CandidHR, Pawwp' },
      { name: 'Golang', icon: <SiGo />, level: 75, levelText: 'Proficient', desc: 'Experienced in developing high-performance REST APIs, TUI command-line tools using BubbleTea, and concurrent backend services.', projects: 'Structura, Pawwp' },
      { name: 'Bash', icon: <FaCode />, level: 85, levelText: 'Advanced', desc: 'Writing automation scripts, server maintenance tasks, logs parser, and automated backups.', projects: 'DevOps Operations' }
    ],
    databases: [
      { name: 'MySQL', icon: <SiMysql />, level: 80, levelText: 'Proficient', desc: 'Relational database schema design, querying, connection pooling, and migration.', projects: 'CandidHR (Legacy)' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85, levelText: 'Advanced', desc: 'Relational database architecture, indices, transactions, and migration orchestration.', projects: 'CandidHR, BlissIQ' },
      { name: 'MongoDB', icon: <SiMongodb />, level: 80, levelText: 'Proficient', desc: 'NoSQL database design, document modeling, mongoose integration, and database orchestration.', projects: 'Pawwp, Portfolio Backend' }
    ]
  };

  const experience = {
    company: 'Diacto Technologies',
    position: 'DevOps Intern',
    location: 'Baner, Pune MH',
    period: 'Jan 2025 - Present',
    highlights: [
      'Supported deployment and automation of applications using Docker, ECS Fargate, and AWS CI/CD tools',
      'Contributed to infrastructure management on AWS, including VPC, IAM, and RDS configurations',
      'Worked on secure access setup, environment provisioning, and system monitoring for production workloads',
      'Documented deployment processes and collaborated with developers through Git and Jira'
    ],
    projects: [
      {
        name: 'CandidHR',
        description: 'AI-powered recruitment platform',
        tech: ['ECS Fargate', 'Docker', 'Django', 'React', 'MySQL', 'PostgreSQL'],
        achievements: [
          'Deployed multi-service architecture using ECS Fargate with CI/CD automation',
          'Maintained Dockerized backend (Django) and frontend (React)',
          'Managed MySQL to PostgreSQL transition'
        ]
      },
      {
        name: 'BlissIQ',
        description: 'EduTech platform for learning in regional languages',
        tech: ['RDS', 'VPC', 'ECS', 'CodeBuild'],
        achievements: [
          'Handled RDS connectivity, security group policies, and VPC setup',
          'Automated deployments to ECS using custom CodeBuild pipelines'
        ]
      }
    ]
  };

  const education = {
    degree: 'Bachelor of Technology (B.Tech)',
    major: 'Artificial Intelligence and Machine Learning',
    minor: 'Cloud Computing',
    institution: 'Symbiosis Institute of Technology',
    location: 'Pune, MH',
    period: '2021 - 2025',
    details: 'Specialized in building and deploying AI models and cloud-native solutions. Acquired hands-on experience in machine learning pipelines, deep learning frameworks, and scalable cloud deployments.',
    coursework: [
      'Data Structures & Algorithms',
      'Cloud Infrastructure & Services',
      'Neural Networks & Deep Learning',
      'DevOps & Automation Pipelines',
      'Database Management Systems'
    ],
    achievements: [
      'Co-authored 2 research publications in Brain Tumor MRI clustering and PCA analysis',
      'Completed Minor in Cloud Computing with focus on AWS services and deployment methodologies'
    ]
  };

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
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="profile-section">
            <div className="profile-image">
              <img src="/PFP.jpg" alt="Aniket Jhariya" className="profile-avatar" />
            </div>
            <div className="profile-info">
              <h1>Aniket Jhariya</h1>
              <h2>DevOps Engineer</h2>
              <p className="location">• Pune, Maharashtra <br/>• aniket.jhariya@gmail.com <br/> • +91 881 7564 165</p>
            </div>
          </div>
          
          <div className="profile-description">
            <p>
              Passionate and hands-on DevOps Engineer with internship experience at Diacto Technologies, 
              where I contributed to CI/CD pipelines, cloud infrastructure (AWS), and deployment automation. 
              With a strong foundation in Computer Science, AWS, Docker, and Kubernetes, I aim to support 
              agile teams in delivering scalable and resilient systems.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <h2 className="section-title">
          <FaBriefcase className="section-icon" />
          Professional Experience
        </h2>
        
        <div className="timeline-container">
          <div className="timeline-item">
            <div className="timeline-node">
              <FaBriefcase />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{experience.company}</h3>
                <span className="period">{experience.period}</span>
              </div>
              <h4>{experience.position}</h4>
              <p className="location">{experience.location}</p>
              
              <ul className="highlights">
                {experience.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
              
              <div className="project-experience-grid">
                <h4>Internship Projects Handled</h4>
                <div className="experience-projects-list">
                  {experience.projects.map((project, index) => (
                    <div key={index} className="experience-project-card">
                      <h5>{project.name}</h5>
                      <p className="project-desc">{project.description}</p>
                      <div className="project-tech">
                        {project.tech.map((t, i) => (
                          <span key={i} className="tech-tag">{t}</span>
                        ))}
                      </div>
                      <ul className="project-achievements-list">
                        {project.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <h2 className="section-title">
          <FaGraduationCap className="section-icon" />
          Education
        </h2>
        
        <div className="education-card-detailed">
          <div className="education-header">
            <h3>{education.institution}</h3>
            <span className="period">{education.period}</span>
          </div>
          <h4>{education.degree}</h4>
          <p className="education-major">Major in <strong>{education.major}</strong> • Minor in <strong>{education.minor}</strong> • {education.location}</p>
          <p className="education-desc">{education.details}</p>
          
          <div className="education-details-grid">
            <div className="education-coursework">
              <h5><FaBook /> Relevant Coursework</h5>
              <div className="coursework-badges">
                {education.coursework.map((course, i) => (
                  <span key={i} className="course-badge">{course}</span>
                ))}
              </div>
            </div>
            
            <div className="education-achievements">
              <h5><FaAwardIcon /> Academic Achievements</h5>
              <ul className="academic-achievements-list">
                {education.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-title">
          <FaCode className="section-icon" />
          Technical Skills
        </h2>
        
        <div className="skills-grid-compact">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-category-card">
              <h3>
                {category === 'cloud' && <FaCloud />}
                {category === 'devops' && <FaTools />}
                {category === 'programming' && <FaCode />}
                {category === 'databases' && <FaDatabase />}
                {' ' + category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="skills-chips">
                {items.map((skill, index) => (
                  <div key={index} className="skill-chip" onClick={() => setActiveSkill(skill)}>
                    <span className="skill-chip-icon">{skill.icon}</span>
                    <span className="skill-chip-name">{skill.name}</span>
                    <span className="skill-chip-level">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Details Modal */}
      {activeSkill && (
        <div className="modal-overlay" onClick={() => setActiveSkill(null)}>
          <div className="modal-content skill-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveSkill(null)}>&times;</button>
            <div className="modal-header">
              <span className="skill-modal-icon" style={{ color: '#3b82f6', fontSize: '2.2rem', display: 'flex', alignItems: 'center' }}>
                {activeSkill.icon}
              </span>
              <div style={{ marginLeft: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>{activeSkill.name}</h3>
                <span className="skill-modal-level" style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.9rem' }}>
                  {activeSkill.levelText} ({activeSkill.level}%)
                </span>
              </div>
            </div>
            <div className="modal-body">
              <div className="skill-progress-bar-container" style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.2rem' }}>
                <div className="skill-progress-bar-fill" style={{ height: '100%', width: `${activeSkill.level}%`, background: 'linear-gradient(90deg, #3b82f6, #6366f1)', borderRadius: '4px' }}></div>
              </div>
              <p className="skill-modal-desc" style={{ color: '#475569', lineHeight: 1.6, fontSize: '1rem', margin: '0 0 1rem 0' }}>
                {activeSkill.desc}
              </p>
              {activeSkill.projects && (
                <div className="skill-modal-projects" style={{ background: '#f1f5f9', padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.9rem', color: '#334155' }}>
                  <strong style={{ color: '#0f172a' }}>Applied in:</strong> {activeSkill.projects}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Publications Section */}
      <section className="publications-section">
        <h2 className="section-title">
          <FaAward className="section-icon" />
          Publications
        </h2>
        
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
      </section>
    </div>
  );
};

export default About;
