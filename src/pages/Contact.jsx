import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import './Contact.css';

// Import icons for consistency with footer
import linkedinIcon from '../assets/linkedin.png';
import whatsappIcon from '../assets/whatsapp.png';
import instagramIcon from '../assets/instagram.png';

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      <main className="main-content">
        <section className="contact-hero">
          <div className="section-container">
            <motion.h1 
              className="page-title"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="page-subtitle"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Reach out to us for personalized career assistance
            </motion.p>
            
            <motion.div 
              className="contact-info hero-contact-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>Contact Information</h3>
              <p>We're here to answer any questions about our services and how we can help advance your career.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:hr@applycoachpro.com">hr@applycoachpro.com</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <img src={whatsappIcon} alt="WhatsApp" className="footer-icon" />
                  </div>
                  <div className="contact-text">
                    <h4>WhatsApp</h4>
                    <a href="https://wa.me/447776736657" target="_blank" rel="noopener noreferrer">+44 7776 736657</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <img src={linkedinIcon} alt="LinkedIn" className="footer-icon" />
                  </div>
                  <div className="contact-text">
                    <h4>LinkedIn</h4>
                    <a href="https://www.linkedin.com/company/apply-coachpro/about/" target="_blank" rel="noopener noreferrer">ApplyCoachPro</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <img src={instagramIcon} alt="Instagram" className="footer-icon" />
                  </div>
                  <div className="contact-text">
                    <h4>Instagram</h4>
                    <a href="https://www.instagram.com/applycoachproofficial" target="_blank" rel="noopener noreferrer">applycoachproofficial</a>
                  </div>
                </div>
              </div>

              <div className="office-hours">
                <h4>Office Hours</h4>
                <p>Monday - Friday: 9:00 AM - 5:00 PM (GMT)</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="faq-contact-section">
          <div className="section-container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How quickly will I receive a response?</h3>
                <p>We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please indicate this in your message subject.</p>
              </div>
              <div className="faq-item">
                <h3>Do you offer international services?</h3>
                <p>Yes, we work with clients worldwide and can accommodate different time zones for consultations.</p>
              </div>
              <div className="faq-item">
                <h3>What if I'm not satisfied with the service?</h3>
                <p>We offer a 30-day satisfaction guarantee. If you're not happy with our service, we'll work with you to make it right or provide a refund.</p>
              </div>
              <div className="faq-item">
                <h3>How long does it take to complete a service?</h3>
                <p>Our turnaround time varies from 5-14 business days depending on the package and current demand. Rush services are available for an additional fee.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact; 