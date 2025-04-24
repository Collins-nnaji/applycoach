import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServiceModal.css';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div 
            className="service-modal"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <button className="close-button" onClick={onClose}>×</button>
            
            <div className="modal-content">
              <div className="modal-header">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="modal-image"
                />
                <div className="modal-title">
                  <h2>{service.title}</h2>
                  <span className="service-tag">Professional Service</span>
                </div>
              </div>
              
              <div className="modal-body">
                <p className="service-description">{service.fullDescription || service.description}</p>
                
                <div className="service-benefits">
                  <h3>Key Benefits</h3>
                  <ul>
                    {service.benefits && service.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                    {!service.benefits && (
                      <>
                        <li>Personalized approach tailored to your career goals</li>
                        <li>Created by CIPD-qualified HR professionals</li>
                        <li>Authentic content that stands out from AI-generated alternatives</li>
                        <li>Ongoing support throughout the process</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="service-process">
                  <h3>Our Process</h3>
                  <div className="process-steps">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Initial Consultation</h4>
                        <p>We begin with a thorough assessment of your career goals, experience, and skills.</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Custom Development</h4>
                        <p>Our experts create personalized content that authentically represents your professional value.</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Review & Refine</h4>
                        <p>We collaborate with you to refine the content until it perfectly aligns with your vision.</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Implementation & Support</h4>
                        <p>Receive your finalized materials along with strategic guidance for maximum impact.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <motion.button
                  onClick={() => {
                    onClose();
                    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="view-packages-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Packages
                </motion.button>
                <motion.button
                  onClick={() => {
                    onClose();
                    const contactSection = document.getElementById('contact') || document.getElementById('faq');
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="contact-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal; 