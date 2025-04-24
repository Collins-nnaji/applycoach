import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResourceModal.css';

const ResourceModal = ({ resource, isOpen, onClose }) => {
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
            className="resource-modal"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <button className="close-button" onClick={onClose}>×</button>
            
            <div className="modal-content">
              <div className="modal-header">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="modal-image"
                />
                <div className="modal-title">
                  <h2>{resource.title}</h2>
                  <span className="resource-type">{resource.type}</span>
                </div>
              </div>
              
              <div className="modal-body">
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-details">
                  <h3>Key Benefits</h3>
                  <ul>
                    {resource.benefits && resource.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                    {!resource.benefits && (
                      <>
                        <li>Enhance your job search strategy</li>
                        <li>Learn industry best practices</li>
                        <li>Gain competitive advantage</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="preview-section">
                  <h3>Preview</h3>
                  <div className="preview-image">
                    {resource.previewImage ? (
                      <img src={resource.previewImage} alt="Resource preview" />
                    ) : (
                      <div className="placeholder-preview">
                        <p>Preview not available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <motion.a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="download-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {resource.type === 'guide' ? 'Download Guide' :
                   resource.type === 'checklist' ? 'Download Checklist' :
                   'Access Resource'}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResourceModal; 