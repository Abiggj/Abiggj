import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
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

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>
            Ready to scale your infrastructure or automate your deployment pipelines? 
            Let's connect and build something solid together.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="contact-container">
          
          {/* Left Column: Info & Details */}
          <div className="contact-info-column">
            <h2>Contact Information</h2>
            <p className="contact-desc">
              Have a DevOps query, a contract role, or want to discuss pipeline automation? 
              Fill out the form, or reach out through my direct contacts.
            </p>

            <div className="contact-info-list">
              <a href="mailto:aniket.jhariya@gmail.com" className="contact-info-item">
                <div className="info-icon email">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <span>Email Me</span>
                  <strong>aniket.jhariya@gmail.com</strong>
                </div>
              </a>

              <a href="tel:+918817564165" className="contact-info-item">
                <div className="info-icon phone">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <span>Call Me</span>
                  <strong>+91 881 756 4165</strong>
                </div>
              </a>

              <div className="contact-info-item">
                <div className="info-icon location">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <span>Location</span>
                  <strong>Pune, Maharashtra, India</strong>
                </div>
              </div>
            </div>

            <div className="social-links-section">
              <h3>Professional Profiles</h3>
              <div className="social-buttons-grid">
                <a 
                  href="https://linkedin.com/in/aniket-jhariya" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-button linkedin"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a 
                  href="https://github.com/Abiggj" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-button github"
                >
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="contact-form-column">
            <div className="contact-form-card">
              <h3>Send Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project proposal / Inquiry"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Describe your requirements or message details..."
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
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
