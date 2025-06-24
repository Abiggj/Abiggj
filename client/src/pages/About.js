import React from 'react';
import { FaGraduationCap, FaBriefcase, FaAward, FaCode, FaCloud, FaDatabase, FaTools } from 'react-icons/fa';
import { SiAmazonwebservices, SiDocker, SiKubernetes, SiPython, SiJavascript, SiGo, SiMysql, SiPostgresql, SiMongodb } from 'react-icons/si';

const About = () => {
  const skills = {
    cloud: [
      { name: 'AWS', icon: <SiAmazonwebservices />, level: 90 },
      { name: 'GCP', icon: <FaCloud />, level: 75 },
      { name: 'Azure', icon: <FaCloud />, level: 70 }
    ],
    devops: [
      { name: 'Docker', icon: <SiDocker />, level: 85 },
      { name: 'Kubernetes', icon: <SiKubernetes />, level: 80 },
      { name: 'CI/CD', icon: <FaTools />, level: 85 },
      { name: 'Linux', icon: <FaCode />, level: 90 }
    ],
    programming: [
      { name: 'Python', icon: <SiPython />, level: 90 },
      { name: 'JavaScript', icon: <SiJavascript />, level: 85 },
      { name: 'Golang', icon: <SiGo />, level: 75 },
      { name: 'Bash', icon: <FaCode />, level: 85 }
    ],
    databases: [
      { name: 'MySQL', icon: <SiMysql />, level: 80 },
      { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 80 }
    ]
  };

  const experience = {
    current: {
      company: 'Diacto Technologies',
      position: 'DevOps Intern',
      location: 'Baner, Pune MH',
      period: 'Jan 2025 - Present',
      highlights: [
        'Supported deployment and automation of applications using Docker, ECS Fargate, and AWS CI/CD tools',
        'Contributed to infrastructure management on AWS, including VPC, IAM, and RDS configurations',
        'Worked on secure access setup, environment provisioning, and system monitoring for production workloads',
        'Documented deployment processes and collaborated with developers through Git and Jira'
      ]
    },
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
    degree: 'Bachelor of Technology',
    major: 'AI and Machine Learning',
    minor: 'Cloud Computing',
    institution: 'Symbiosis Institute of Technology',
    location: 'Pune, MH',
    period: '2021-2025'
  };

  const publications = [
    'Distance Analysis and Dimensionality Reduction using PCA on Brain Tumor MRI Scans'
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="profile-section">
            <div className="profile-image">
              <FaCode className="profile-icon" />
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
        
        <div className="experience-card current">
          <div className="experience-header">
            <h3>{experience.current.company}</h3>
            <span className="period">{experience.current.period}</span>
          </div>
          <h4>{experience.current.position}</h4>
          <p className="location">{experience.current.location}</p>
          
          <ul className="highlights">
            {experience.current.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          
          <div className="project-experience">
            <h5>Project Experience</h5>
            {experience.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h6>{project.name}</h6>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <ul className="project-achievements">
                  {project.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <h2 className="section-title">
          <FaGraduationCap className="section-icon" />
          Education
        </h2>
        
        <div className="education-card">
          <div className="education-header">
            <h3>{education.institution}</h3>
            <span className="period">{education.period}</span>
          </div>
          <h4>{education.degree}</h4>
          <p>Major in {education.major} • Minor in {education.minor}</p>
          <p className="location">{education.location}</p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-title">
          <FaCode className="section-icon" />
          Technical Skills
        </h2>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h3><FaCloud /> Cloud Platforms</h3>
            <div className="skills-list">
              {skills.cloud.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3><FaTools /> DevOps Tools</h3>
            <div className="skills-list">
              {skills.devops.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3><FaCode /> Programming</h3>
            <div className="skills-list">
              {skills.programming.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3><FaDatabase /> Databases</h3>
            <div className="skills-list">
              {skills.databases.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="publications-section">
        <h2 className="section-title">
          <FaAward className="section-icon" />
          Publications
        </h2>
        
        <div className="publications-list">
          {publications.map((publication, index) => (
            <div key={index} className="publication-item">
              <FaAward className="publication-icon" />
              <p>{publication}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
