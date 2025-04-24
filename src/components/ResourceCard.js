import React from 'react';
import { motion } from 'framer-motion';
import './ResourceCard.css';

const ResourceCard = ({ resource, index, onClick }) => (
  <motion.div 
    className="resource-card"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    onClick={() => onClick(resource)}
  >
    <div className="card-tag">{resource.type}</div>
    <motion.div 
      className="card-image-container"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={resource.image} 
        alt={resource.title} 
        className="resource-image"
      />
    </motion.div>
    <div className="resource-content">
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <motion.button 
        className="view-details-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(resource);
        }}
      >
        View Details
      </motion.button>
    </div>
  </motion.div>
);

export default ResourceCard;