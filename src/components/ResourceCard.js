import React from 'react';
import { motion } from 'framer-motion';

const ResourceCard = ({ resource, index }) => (
  <motion.div 
    className="resource-card"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    <motion.img 
      src={resource.image} 
      alt={resource.title} 
      className="resource-image"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <div className="resource-content">
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <motion.a 
        href={resource.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="resource-link"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {resource.type === 'guide' ? 'Download Guide' :
         resource.type === 'checklist' ? 'View Checklist' :
         'Access Resource'}
      </motion.a>
    </div>
  </motion.div>
);

export default ResourceCard;