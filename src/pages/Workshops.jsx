import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Workshops.css'; // Import new CSS file

// Main page component
function Workshops() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="workshops-page"> 
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section className="workshops-hero">
          <div className="section-container">
            <motion.h1 
              className="page-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Professional Development Workshops
            </motion.h1>
            <motion.p 
              className="page-subtitle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Enhance your career skills through our expert-led interactive sessions and on-demand learning resources
            </motion.p>
          </div>
        </section>

        {/* Featured Workshop */}
        <section className="featured-workshop-section">
          <div className="section-container">
            <motion.div 
              className="featured-workshop"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="featured-content">
                <div className="featured-tag">Featured Workshop</div>
                <h2>Master Class: Executive Presence in the Digital Age</h2>
                <p className="workshop-date">August 17, 2024 • 10:00 AM - 2:00 PM (GMT)</p>
                <p className="workshop-description">
                  Learn how to command attention, inspire confidence, and influence decisions in virtual and hybrid work environments. This intensive 4-hour workshop combines theory with practical exercises to develop your executive presence for career advancement.
                </p>
                <ul className="workshop-highlights">
                  <li>Body language and vocal techniques for virtual meetings</li>
                  <li>Strategies for confident communication</li>
                  <li>Building professional credibility remotely</li>
                  <li>Personalized feedback on your presentation style</li>
                </ul>
                <div className="workshop-pricing">
                  <span className="workshop-price">£175</span>
                  <span className="workshop-price-note">(Early bird: £145 until July 25)</span>
                </div>
                <motion.button 
                  className="primary-button large-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Now
                </motion.button>
              </div>
              <div className="featured-image">
                {/* Real image from the web for featured workshop */}
                <img 
                  src="https://images.pexels.com/photos/6592875/pexels-photo-6592875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Business professionals in a workshop setting"
                  className="workshop-img"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workshops Tabs */}
        <section className="workshops-tabs-section">
          <div className="section-container">
            <div className="tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Live Workshops
                </button>
                <button 
                  className={`tab-button ${activeTab === 'ondemand' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ondemand')}
                >
                  On-Demand Webinars
                </button>
              </div>
              
              <div className="tabs-content">
                {activeTab === 'upcoming' ? (
                  <UpcomingWorkshops />
                ) : (
                  <OnDemandWebinars />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Registration form removed as requested */}
      </main>
      <Footer />
    </div>
  );
}

// Component for upcoming workshops 
const UpcomingWorkshops = () => {
  const workshops = [
    {
      date: "June 26, 2024",
      title: "Mastering Behavioural Interviews: STAR Method Deep Dive",
      description: "Learn how to effectively structure your answers to impress recruiters using the STAR technique.",
      price: "£95",
      spots: "12 spots left",
      image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      date: "July 10, 2024",
      title: "Building Your Personal Brand on LinkedIn",
      description: "Strategies to enhance your LinkedIn profile and network effectively.",
      price: "£85",
      spots: "8 spots left",
      image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      date: "July 24, 2024",
      title: "Salary Negotiation Tactics for Professionals",
      description: "Gain confidence and learn strategies to negotiate the salary you deserve.",
      price: "£110",
      spots: "15 spots left",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      date: "August 5, 2024",
      title: "Career Transition Strategy Workshop",
      description: "Develop a comprehensive plan to successfully navigate a career change or industry pivot.",
      price: "£125",
      spots: "20 spots left",
      image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <div className="workshops-container">
      {workshops.map((workshop, index) => (
        <motion.div 
          key={index} 
          className="workshop-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="workshop-image">
            <img src={workshop.image} alt={workshop.title} />
          </div>
          <div className="workshop-date">{workshop.date}</div>
          <h3 className="workshop-title">{workshop.title}</h3>
          <p className="workshop-description">{workshop.description}</p>
          <div className="workshop-meta">
            <span className="workshop-price">{workshop.price}</span>
            <span className="workshop-spots">{workshop.spots}</span>
          </div>
          <motion.button 
            className="primary-button workshop-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

// Component for on-demand webinars
const OnDemandWebinars = () => {
  const webinars = [
    {
      title: "Crafting an ATS-Friendly CV",
      description: "Learn techniques to ensure your CV gets past applicant tracking systems and into human hands.",
      duration: "45 minutes",
      price: "£35",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Effective Job Search Strategies",
      description: "Discover proven methods to find and secure job opportunities that match your career goals.",
      duration: "60 minutes",
      price: "£40",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Mastering Remote Job Interviews",
      description: "Tips and techniques for making a strong impression during virtual interviews.",
      duration: "50 minutes",
      price: "£35",
      image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "LinkedIn Profile Optimization Masterclass",
      description: "Step-by-step guide to creating a LinkedIn profile that attracts recruiters and opportunities.",
      duration: "75 minutes",
      price: "£45",
      image: "https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Handling Difficult Interview Questions",
      description: "Strategies for addressing challenging questions with confidence and authority.",
      duration: "55 minutes",
      price: "£40",
      image: "https://images.pexels.com/photos/7256548/pexels-photo-7256548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Personal Branding for Career Success",
      description: "Develop a consistent personal brand that highlights your professional value.",
      duration: "65 minutes",
      price: "£45",
      image: "https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <div className="webinars-container">
      {webinars.map((webinar, index) => (
        <motion.div 
          key={index} 
          className="webinar-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <div className="webinar-image">
            <img src={webinar.image} alt={webinar.title} />
          </div>
          <h3 className="webinar-title">{webinar.title}</h3>
          <p className="webinar-description">{webinar.description}</p>
          <div className="webinar-meta">
            <span className="webinar-duration">Duration: {webinar.duration}</span>
            <span className="webinar-price">{webinar.price}</span>
          </div>
          <motion.button 
            className="secondary-button webinar-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Purchase Access
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default Workshops; 