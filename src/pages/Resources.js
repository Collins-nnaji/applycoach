import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import resourcePic from '../assets/Resourcepic.jpg';
import './Resources.css';

const Resources = () => {
  const [filter, setFilter] = useState('all');

  const resources = [
    {
      id: 1,
      type: 'guide',
      title: 'Authentic Resume Writing Guide',
      description: 'Learn how to create a genuine, impactful resume that stands out.',
      link: '/resume-writing-guide.pdf',
      image: resourcePic
    },
    {
      id: 2,
      type: 'checklist',
      title: 'LinkedIn Optimization Checklist',
      description: 'Enhance your LinkedIn profile with our comprehensive checklist.',
      link: '/linkedin-checklist.pdf',
      image: resourcePic
    },
    {
      id: 3,
      type: 'guide',
      title: 'Comprehensive Interview Guide',
      description: 'Prepare for your next interview with our in-depth guide.',
      link: '/interview-guide.pdf',
      image: resourcePic
    }
  ];

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === filter);

  return (
    <div className="resources-page">
      <Header />
      <main className="resources-content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Career Resources
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore our curated collection of resources to boost your job search and career development.
        </motion.p>

        <motion.div 
          className="resource-filters"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('guide')} className={filter === 'guide' ? 'active' : ''}>Guides</button>
          <button onClick={() => setFilter('checklist')} className={filter === 'checklist' ? 'active' : ''}>Checklists</button>
        </motion.div>

        <motion.div 
          className="resource-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {filteredResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </motion.div>

        <motion.section 
          className="featured-resource"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2>Featured Resource</h2>
          <div className="featured-content">
            <motion.img 
              src={resourcePic} 
              alt="Comprehensive Career Guide"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="featured-text">
              <h3>Comprehensive Career Guide 2023</h3>
              <p>Download our latest guide covering all aspects of job searching and career development in the current market.</p>
              <motion.a 
                href="/resources/career-guide-2023.pdf" 
                className="download-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Guide
              </motion.a>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="resource-newsletter"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest career tips and exclusive resources.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;