import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';
import '../styles/Contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'aniket.jhariya@gmail.com',
      link: 'mailto:aniket.jhariya@gmail.com',
      color: '#ea4335'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 881 7564 165',
      link: 'tel:+918817564165',
      color: '#34a853'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Pune, Maharashtra, India',
      link: 'https://maps.google.com/?q=Pune,Maharashtra,India',
      color: '#fbbc05'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/aniket-jhariya',
      link: 'https://linkedin.com/in/aniket-jhariya',
      color: '#0077b5'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'github.com/Abiggj',
      link: 'https://github.com/Abiggj',
      color: '#333'
    }
  ];

  const workingHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'By Appointment' }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>
            Ready to discuss your next DevOps project or have questions about my work? 
            I'd love to hear from you. Let's connect and explore how we can work together.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send Me a Message</h2>
              <p>Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="form-icon" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="form-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  <FaComment className="form-icon" />
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <FaComment className="form-icon" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project or question..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  <span>✓</span>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Let's discuss your project requirements and how I can help.</p>

              <div className="contact-items">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    className="contact-item"
                    target={item.link.startsWith('http') ? '_blank' : '_self'}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <div className="contact-icon" style={{ background: item.color }}>
                      {item.icon}
                    </div>
                    <div className="contact-details">
                      <h4>{item.label}</h4>
                      <p>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="working-hours">
              <h3>Working Hours</h3>
              <div className="hours-list">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="hours-item">
                    <span className="day">{schedule.day}</span>
                    <span className="hours">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Info */}
            <div className="professional-info">
              <h3>Current Role</h3>
              <div className="role-card">
                <h4>DevOps Engineer</h4>
                <p>Diacto Technologies</p>
                <span className="role-status">Available for freelance projects</span>
              </div>

              <div className="expertise-areas">
                <h4>Areas of Expertise</h4>
                <ul>
                  <li>Cloud Infrastructure (AWS, GCP, Azure)</li>
                  <li>CI/CD Pipeline Development</li>
                  <li>Docker & Kubernetes</li>
                  <li>Infrastructure as Code</li>
                  <li>AI/ML Model Deployment</li>
                  <li>System Monitoring & Automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="contact-cta">
        <div className="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's transform your infrastructure and accelerate your development workflow. 
            I'm here to help you build scalable, reliable systems.
          </p>
          <div className="cta-buttons">
            <a href="mailto:aniket.jhariya@gmail.com" className="cta-btn primary">
              <FaEnvelope />
              Email Me
            </a>
            <a href="/Aniket_Jhariya_Resume.pdf" download className="cta-btn secondary">
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
