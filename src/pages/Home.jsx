import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import ResourceModal from '../components/ResourceModal';
import ServiceModal from '../components/ServiceModal';
import linkedinPic from '../assets/Linkedinpic.jpg';
import onlinePresencePic from '../assets/OnlinePresencepic.jpg';
import cvPic from '../assets/CVpic.jpg';
import resourcePic from '../assets/Resourcepic.jpg';
import linkedinIcon from '../assets/linkedin.png';
import whatsappIcon from '../assets/whatsapp.png';
import instagramIcon from '../assets/instagram.png';
import './Home.css';

function Home() {
  const [faq, setFaq] = useState([
    {
      question: "Why choose ApplyCoachPro as your career growth and job placement partner?",
      answer: `ApplyCoachPro offers a unique advantage as your career partner. Our team consists of expert HR professionals with CIPD qualifications and extensive industry experience. We work closely with various companies across multiple sectors, giving us insider knowledge of current hiring trends and expectations. This allows us to provide you with tailored, up-to-date advice that aligns with what employers are really looking for. Our personalized approach ensures that your career goals are met with strategic planning and expert guidance.`,
      open: false
    },
    {
      question: "How does ApplyCoachPro's service differ from using AI to write CVs and professional profiles?",
      answer: `While AI tools can generate content quickly, they often produce generic, buzzword-filled profiles that lack authenticity and fail to showcase your unique experiences and skills. Recruiters and ATS (Applicant Tracking Systems) are increasingly adept at detecting AI-generated content, which can harm your application's credibility. At ApplyCoachPro, we emphasize creating genuine, compelling narratives that highlight your individual strengths and experiences. Our human experts work with you to craft authentic profiles that resonate with employers and pass through ATS filters, giving you a significant advantage in your job search.`,
      open: false
    },
    {
      question: "What services does ApplyCoachPro offer and how long do they take?",
      answer: `ApplyCoachPro offers a range of services including CV enhancement, LinkedIn profile optimization, and comprehensive career strategy planning. Our turnaround time varies from 5-14 business days depending on the chosen package and current workload. We also offer customizable packages to meet specific needs. For all our services, we provide a 30-day money-back guarantee if you're not satisfied. Additionally, we offer free resources such as a Resume Writing Guide, LinkedIn Checklist, and Interview Preparation Guide to support your career journey.`,
      open: false
    }
  ]);

  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const resources = [
    {
      id: 1,
      type: 'guide',
      title: 'Authentic Resume Writing Guide',
      description: 'Learn how to create a genuine, impactful resume that stands out from AI-generated content.',
      link: '/resume-writing-guide.pdf',
      image: resourcePic,
      benefits: [
        'Learn how to showcase your unique skills and experience',
        'Understand what recruiters are looking for in 2023',
        'Get past ATS systems with proven strategies',
        'See real examples of successful resumes'
      ]
    },
    {
      id: 2,
      type: 'checklist',
      title: 'LinkedIn Optimization Checklist',
      description: 'Transform your LinkedIn profile to attract recruiters and hiring managers with our comprehensive checklist.',
      link: '/linkedin-checklist.pdf',
      image: resourcePic,
      benefits: [
        'Optimize your profile for LinkedIn\'s algorithm',
        'Create a compelling and authentic headline',
        'Write an about section that gets you noticed',
        'Generate more profile views and connections'
      ]
    },
    {
      id: 3,
      type: 'guide',
      title: 'Comprehensive Interview Guide',
      description: 'Master the art of interviewing with techniques to showcase your authentic self and stand out to employers.',
      link: '/interview-guide.pdf',
      image: resourcePic,
      benefits: [
        'Prepare for common and challenging questions',
        'Learn how to tell compelling stories about your experience',
        'Understand what interviewers are really looking for',
        'Navigate salary negotiations with confidence'
      ]
    },
    {
      id: 4,
      type: 'toolkit',
      title: 'Personal Branding Toolkit',
      description: 'Build a consistent and authentic personal brand across all professional platforms to enhance your career prospects.',
      link: '/personal-branding-toolkit.pdf',
      image: resourcePic,
      benefits: [
        'Identify your unique professional value proposition',
        'Create a consistent brand identity across platforms',
        'Learn how to effectively network using your personal brand',
        'Stand out in your industry as a thought leader'
      ]
    }
  ];

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    const sections = ['hero', 'features', 'job-search', 'packages', 'faq', 'testimonials', 'contact'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (currentSection) setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleFAQ = useCallback((index) => {
    setFaq(prevFaq => prevFaq.map((item, i) => ({
      ...item,
      open: i === index ? !item.open : false
    })));
  }, []);

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    setIsResourceModalOpen(true);
  };

  const handleCloseResourceModal = () => {
    setIsResourceModalOpen(false);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
  };

  return (
    <div className="home">
      <Header activeSection={activeSection} />
      <main className="main-content">
        <HeroSection scrollY={scrollY} />
        <FeaturesSection onServiceClick={handleServiceClick} />
        <JobSearchStrategySection />
        <PackagesSection />
        
        {/* Resources Section */}
        <section id="resources" className="resources-section">
          <div className="section-container">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Career Resources
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our curated collection of resources to boost your job search and career development
            </motion.p>

            <motion.div 
              className="resource-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {resources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  index={index} 
                  onClick={handleResourceClick}
                />
              ))}
            </motion.div>

            <motion.div 
              className="newsletter-container"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="newsletter-content">
                <h3>Get Career Updates</h3>
                <p>Subscribe to our newsletter for the latest career tips, job market insights, and exclusive resources.</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Enter your email address" required />
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
        
        <FAQSection faq={faq} toggleFAQ={toggleFAQ} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Resource Modal */}
      <ResourceModal 
        resource={selectedResource} 
        isOpen={isResourceModalOpen && selectedResource !== null} 
        onClose={handleCloseResourceModal} 
      />
      
      {/* Service Modal */}
      <ServiceModal 
        service={selectedService} 
        isOpen={isServiceModalOpen && selectedService !== null} 
        onClose={handleCloseServiceModal} 
      />
    </div>
  );
}

const HeroSection = ({ scrollY }) => (
  <section id="hero" className="hero-section">
    <div className="hero-background" style={{transform: `translateY(${scrollY * 0.4}px)`}} />
    <div className="hero-content">
      <motion.div 
        className="hero-text"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1>
          <span className="highlight">Enhance</span> Your Profile<br/>
          <span className="highlight">Achieve</span> Your Professional Goals<br/>
          <span className="highlight">Secure</span> the Perfect Job
        </h1>
        <p>Expert-driven career services tailored for the modern professional</p>
        <div className="hero-buttons">
          <motion.a 
            href="#packages" 
            className="primary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Services
          </motion.a>
          <motion.a 
            href="#resources" 
            className="secondary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Free Resources
          </motion.a>
        </div>
      </motion.div>
      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <img src={cvPic} alt="Career Professional" />
      </motion.div>
    </div>
    <div className="hero-scroll">
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span>Scroll Down</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 13L12 20L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  </section>
);

const FeatureItem = ({ image, alt, title, description, reverse, onServiceClick }) => (
  <motion.div 
    className={`feature-item ${reverse ? 'reverse' : ''}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    <div className="feature-image-container">
      <motion.img 
        src={image} 
        alt={alt} 
        className="feature-image"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    </div>
    <div className="feature-text">
      <h3>{title}</h3>
      <p>{description}</p>
      <motion.button 
        className="feature-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onServiceClick({ title, description, image })}
      >
        Learn More
      </motion.button>
    </div>
  </motion.div>
);

const FeaturesSection = ({ onServiceClick }) => (
  <section id="features" className="features-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h2>
      <motion.p 
        className="section-subtitle"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Professional solutions to advance your career
      </motion.p>
      
      <div className="features-container">
        <FeatureItem 
          image={cvPic} 
          alt="CV Review" 
          title="Tailored CV Enhancement"
          description="Our CIPD-qualified experts craft genuine, impactful CVs that highlight your unique strengths and experiences. We go beyond buzzwords to create a CV that truly represents you and resonates with employers."
          onServiceClick={onServiceClick}
        />
        <FeatureItem 
          image={linkedinPic} 
          alt="LinkedIn Optimization" 
          title="Effective LinkedIn Profile Boost"
          description="We enhance your LinkedIn profile to attract recruiters and hiring managers authentically. Our approach ensures your profile stands out without relying on AI-generated content that could harm your credibility."
          reverse
          onServiceClick={onServiceClick}
        />
        <FeatureItem 
          image={onlinePresencePic} 
          alt="Online Presence" 
          title="Holistic Online Presence"
          description="Our team improves your online visibility across platforms, ensuring a consistent and professional image. We focus on creating genuine content that showcases your expertise and appeals to potential employers."
          onServiceClick={onServiceClick}
        />
      </div>
    </div>
  </section>
);

const JobSearchStrategySection = () => (
  <section id="job-search" className="job-search-section">
    <div className="section-container">
      <motion.div 
        className="job-search-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Our Approach to Job Search Strategy</h2>
        <p>At ApplyCoachPro, we believe in a comprehensive approach to career development and job searching. Our strategies are designed to position you effectively in today's competitive market while ensuring your authentic voice shines through.</p>
        <ul className="strategy-list">
          <li>Personalized assessment of your skills, experience, and career goals</li>
          <li>Custom-tailored career documents that highlight your unique value proposition</li>
          <li>Strategic approach to job searching based on industry insights</li>
          <li>Interview preparation focused on authentic storytelling and genuine rapport</li>
          <li>Ongoing support throughout your career journey</li>
        </ul>
        <motion.a 
          href="#packages" 
          className="primary-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Today
        </motion.a>
      </motion.div>
    </div>
  </section>
);

const PackageCard = ({ title, features, price, buttonText, featured }) => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      className={`package-card ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {featured && <div className="featured-tag">Popular Choice</div>}
      <h3>{title}</h3>
      <div className="price">{price}</div>
      <ul className="package-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <motion.button 
        onClick={scrollToContact}
        className={`package-button ${featured ? 'featured-button' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {buttonText || 'Select Package'}
      </motion.button>
    </motion.div>
  );
};

const PackagesSection = () => (
  <section id="packages" className="packages-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our Packages
      </motion.h2>
      <motion.p 
        className="section-subtitle"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Choose the perfect package to meet your career needs
      </motion.p>
      
      <div className="packages-container">

      <PackageCard
        title="Career Foundation Package"
        price="£150"
        features={[
          "CV refresh aligned to your target roles",
          "LinkedIn tune-up with keyword-rich headline",
          "Customizable cover letter template",
          "Interview readiness checklist",
          "Promo: limited-time introductory price"
        ]}
        buttonText="Get Started"
        featured={true}
      />

      <PackageCard
        title="Interview Coaching Package"
        price="£500"
        features={[
          "Two guaranteed interview opportunities",
          "Personalized coaching before each interview",
          "Mock interview recordings with expert feedback",
          "Confidence and mindset coaching toolkit",
          "Follow-up guidance after every session"
        ]}
        buttonText="Book Now"
      />

      <PackageCard
        title="Guaranteed Interview Package"
        price="£500"
        features={[
          "Three guaranteed interview opportunities",
          "Structured preparation calls for every interview",
          "Employer targeting and outreach on your behalf",
          "Interview day scripts and follow-up templates",
          "Promo: flash offer to lock in your interview pipeline"
        ]}
        buttonText="Book Now"
        featured={true}
      />

      <PackageCard
        title="Targeted Job Application Service"
        price="£1000"
        features={[
          "Guaranteed six interview opportunities",
          "Role sourcing and tailored applications",
          "CV and cover letter customization per submission",
          "Weekly progress reporting and analytics",
          "Priority communication with hiring teams"
        ]}
        buttonText="Enquire Now"
      />

      <PackageCard
        title="Comprehensive Branding & Coaching"
        price="£3500"
        features={[
          "Full personal brand overhaul across CV, LinkedIn, portfolio",
          "End-to-end job search strategy and accountability",
          "Executive interview coaching and salary guidance",
          "On-demand support throughout your search",
          "Promo: bundle premium services in one package"
        ]}
        buttonText="Book Now"
        featured={true}
      />
    </div>

  {/* Custom Package Section remains */}
  <motion.div 
    className="custom-package"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <div className="custom-package-content">
      <h3>Need a Custom Solution?</h3>
      <p>We offer bespoke packages tailored to your specific career goals and challenges.</p>
      <motion.button 
        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
        className="primary-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Us
      </motion.button>
    </div>
  </motion.div>
    </div>
  </section>
);

const FAQSection = ({ faq, toggleFAQ }) => (
  <section id="faq" className="faq-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>
      
      <motion.div 
        className="faq-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {faq.map((item, index) => (
          <motion.div 
            key={index} 
            className={`faq-item ${item.open ? 'open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            layout
          >
            <h3 onClick={() => toggleFAQ(index)}>{item.question}</h3>
            <AnimatePresence>
              {item.open && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const testimonials = [
    { 
      name: "Adekunle Adebayo", 
      quote: "ApplyCoachPro transformed my CV and LinkedIn. I landed my dream job in weeks!",
      role: "Software Engineer"
    },
    { 
      name: "Chiamaka Nwosu", 
      quote: "The interview coaching was invaluable. I felt so confident and prepared.",
      role: "Marketing Director"
    },
    { 
      name: "Fatima Ibrahim", 
      quote: "Their insights into the UK job market are second to none. Highly recommended.",
      role: "Finance Analyst"
    },
    { 
      name: "Emeka Okafor", 
      quote: "The personalized strategy helped me pivot my career successfully. Thank you!",
      role: "Project Manager"
    },
    { 
      name: "Aisha Bello", 
      quote: "Excellent service! They truly understand how to highlight your strengths.",
      role: "HR Specialist"
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What Our Clients Say
        </motion.h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
            >
              <div className="quote-icon">❝</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <p className="author-name">{testimonial.name}</p>
                <p className="author-role">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="contact-section">
    <div className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Get In Touch
      </motion.h2>
      <motion.p 
        className="section-subtitle"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Reach out to us for personalized career assistance
      </motion.p>
      
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
                <img src={whatsappIcon} alt="WhatsApp" className="icon" />
              </div>
              <div className="contact-text">
                <h4>WhatsApp</h4>
                <a href="https://wa.me/447776736657" target="_blank" rel="noopener noreferrer">+44 7776 736657</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <img src={linkedinIcon} alt="LinkedIn" className="icon" />
              </div>
              <div className="contact-text">
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/company/apply-coachpro/about/" target="_blank" rel="noopener noreferrer">ApplyCoachPro</a>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <img src={instagramIcon} alt="Instagram" className="icon" />
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
    </div>
  </section>
);

export default Home;
