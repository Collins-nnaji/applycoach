import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import linkedinPic from '../assets/Linkedinpic.jpg';
import onlinePresencePic from '../assets/OnlinePresencepic.jpg';
import cvPic from '../assets/CVpic.jpg';
import resourcePic from '../assets/Resourcepic.jpg';
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

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    const sections = ['hero', 'features', 'job-search', 'packages', 'resources', 'faq'];
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

  return (
    <div className="home">
      <Header activeSection={activeSection} />
      <main className="main-content">
        <HeroSection scrollY={scrollY} />
        <FeaturesSection />
        <JobSearchStrategySection />
        <PackagesSection />
        <FAQSection faq={faq} toggleFAQ={toggleFAQ} />

        {/* Resources Section */}
        <section id="resources" className="resources-content">
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
        </section>
      </main>
      <Footer />
    </div>
  );
}

const HeroSection = ({ scrollY }) => (
  <motion.section 
    id="hero"
    className="hero" 
    style={{backgroundPositionY: scrollY * 0.5}}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="hero-content">
      <div className="hero-text">
        <motion.h1 
          className="title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="purple">Enhance</span> Your Profile<br/>
          <span className="purple">Achieve</span> Your Professional Goals<br/>
          <span className="purple">Secure</span> the Perfect Job
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Expert-driven career services tailored for the modern professional
        </motion.p>
      </div>
    </div>
  </motion.section>
);

const FeaturesSection = () => (
  <section id="features" className="features-section">
    <h2 className="section-title">Our Services</h2>
    <FeatureItem 
      image={cvPic} 
      alt="CV Review" 
      title="Tailored CV Enhancement"
      description="Our CIPD-qualified experts craft genuine, impactful CVs that highlight your unique strengths and experiences. We go beyond buzzwords to create a CV that truly represents you and resonates with employers."
    />
    <FeatureItem 
      image={linkedinPic} 
      alt="LinkedIn Optimization" 
      title="Effective LinkedIn Profile Boost"
      description="We enhance your LinkedIn profile to attract recruiters and hiring managers authentically. Our approach ensures your profile stands out without relying on AI-generated content that could harm your credibility."
      reverse
    />
    <FeatureItem 
      image={onlinePresencePic} 
      alt="Online Presence" 
      title="Holistic Online Presence"
      description="Our team improves your online visibility across platforms, ensuring a consistent and professional image. We focus on creating genuine content that showcases your expertise and appeals to potential employers."
    />
  </section>
);

const FeatureItem = ({ image, alt, title, description, reverse }) => (
  <motion.div 
    className={`feature-item ${reverse ? 'reverse' : ''}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <motion.img 
      src={image} 
      alt={alt} 
      className="feature-image"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <div className="feature-text">
      <h3>{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  </motion.div>
);

const JobSearchStrategySection = () => (
  <section id="job-search" className="job-search-strategy-section">
    <h2 className="section-title">Comprehensive Career Growth Strategy</h2>
    <p>At ApplyCoachPro, we offer more than just CV writing. Our team of CIPD-qualified HR professionals provides a holistic approach to your career development:</p>
    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.li>Personalized job search planning based on current market trends</motion.li>
      <motion.li>In-depth interview preparation with industry-specific mock interviews</motion.li>
      <motion.li>Expert salary negotiation techniques</motion.li>
      <motion.li>Long-term career path guidance</motion.li>
      <motion.li>Effective networking strategies tailored to your industry</motion.li>
    </motion.ul>
  </section>
);

const PackagesSection = () => (
  <section id="packages" className="packages-section">
    <h2 className="section-title">Our Packages</h2>
    <div className="packages">
      <PackageCard
        title="Essential CV Package"
        features={[
          "Complete CV review by professionals",
          "ATS-compatible formatting and keywords",
          "In-depth skills and experience analysis",
          "Professional editing and formatting",
          "One revision round included"
        ]}
        price="£50"
        link="#"
        buttonText="Book Now"
      />
      <PackageCard
        title="LinkedIn Profile Optimization"
        features={[
          "Profile audit and improvement suggestions",
          "Keyword optimization for visibility",
          "Strategies for connection-building",
          "Professional headline and summary editing",
          "Guided networking tips"
        ]}
        price="£50"
        link="#"
        buttonText="Book Now"
      />
      <PackageCard
        title="CV + Cover Letter Essentials"
        features={[
          "Everything in Essential CV Package",
          "Custom cover letter template",
          "Professional editing for a polished look",
          "Formatting for modern job market",
          "Two revision rounds included"
        ]}
        price="£60"
        link="#"
        buttonText="Book Now"
      />
      <PackageCard
        title="Interview Coaching Package"
        features={[
          "Mock interviews with expert feedback",
          "Techniques for answering tough questions",
          "Industry-specific interview preparation",
          "Three guaranteed interview invitations",
          "Tailored interview follow-up guidance"
        ]}
        price="£300"
        link="#"
        buttonText="Book Now"
      />
      <PackageCard
        title="Guaranteed Interview Package"
        features={[
          "Personalized CV and statement writing",
          "Interview invitation guarantee (up to 3)",
          "Mock interview sessions included",
          "Comprehensive interview preparation",
          "Professional support until placement"
        ]}
        price="£350"
        link="#"
        buttonText="Book Now"
        featured
      />
      <PackageCard
        title="Comprehensive Branding & Coaching"
        features={[
          "Complete job coaching and branding support",
          "LinkedIn and CV optimization included",
          "Personal branding strategy development",
          "Guided support through the hiring process",
          "Professional follow-up and branding tips"
        ]}
        price="£2,000"
        link="#"
        buttonText="Book Now"
      />
    </div>
  </section>
);

const PackageCard = ({ title, features, price, link, buttonText, featured }) => (
  <motion.div 
    className={`package ${featured ? 'featured' : ''}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -10 }}
  >
    <h3>{title}</h3>
    <ul>
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <p className="price">{price}</p>
    <motion.a 
      href={link} 
      className="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {buttonText}
    </motion.a>
  </motion.div>
);

const FAQSection = ({ faq, toggleFAQ }) => (
  <section id="faq" className="faq-section">
    <h2 className="section-title">Frequently Asked Questions</h2>
    <div className="faq-list">
      <AnimatePresence>
        {faq.map((item, index) => (
          <motion.div 
            key={index} 
            className={`faq-item ${item.open ? 'open' : ''}`} 
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3>{item.question}</h3>
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
      </AnimatePresence>
    </div>
  </section>
);

export default Home;
