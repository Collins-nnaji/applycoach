import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import linkedinPic from '../assets/Linkedinpic.jpg';
import onlinePresencePic from '../assets/OnlinePresencepic.jpg';
import cvPic from '../assets/CVpic.jpg';
import cvAnalysisPic from '../assets/CVAnalysispic.jpg';

function Home() {
  const [faq, setFaq] = useState([
    {
      question: "Why choose Credolay as your career growth and job placement partner?",
      answer: `Credolay offers a unique advantage as your career partner. Our team consists of expert HR professionals with CIPD qualifications and extensive industry experience. We work closely with various companies across multiple sectors, giving us insider knowledge of current hiring trends and expectations. This allows us to provide you with tailored, up-to-date advice that aligns with what employers are really looking for. Our personalized approach ensures that your career goals are met with strategic planning and expert guidance.`,
      open: false
    },
    {
      question: "How does Credolay's service differ from using AI to write CVs and professional profiles?",
      answer: `While AI tools can generate content quickly, they often produce generic, buzzword-filled profiles that lack authenticity and fail to showcase your unique experiences and skills. Recruiters and ATS (Applicant Tracking Systems) are increasingly adept at detecting AI-generated content, which can harm your application's credibility. At Credolay, we emphasize creating genuine, compelling narratives that highlight your individual strengths and experiences. Our human experts work with you to craft authentic profiles that resonate with employers and pass through ATS filters, giving you a significant advantage in your job search.`,
      open: false
    },
    {
      question: "What services does Credolay offer and how long do they take?",
      answer: `Credolay offers a range of services including CV enhancement, LinkedIn profile optimization, and comprehensive career strategy planning. Our turnaround time varies from 5-14 business days depending on the chosen package and current workload. We also offer customizable packages to meet specific needs. For all our services, we provide a 30-day money-back guarantee if you're not satisfied. Additionally, we offer free resources such as a Resume Writing Guide, LinkedIn Checklist, and Interview Preparation Guide to support your career journey.`,
      open: false
    },
    {
      question: "How does the CV analysis subscription work?",
      answer: `Our CV analysis subscription service provides ongoing support for your job search and career development. For £4 per month, you receive unlimited CV analyses, personalized job matches based on your CV content, regular career insights, and priority customer support. The service uses advanced AI technology combined with expert human review to provide comprehensive evaluations and recommendations. You can start with a 7-day free trial, and there's no long-term commitment – you can cancel at any time.`,
      open: false
    }
  ]);

  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    const sections = ['hero', 'cv-analysis', 'features', 'job-search', 'packages', 'resources', 'faq', 'subscription'];
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
        <CVAnalysisSection />
        <FeaturesSection />
        <JobSearchStrategySection />
        <PackagesSection />
        <FAQSection faq={faq} toggleFAQ={toggleFAQ} />

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
      <div className="cta-container">
        <motion.a 
          href="#cv-analysis-section" 
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Try Our CV Analysis
        </motion.a>
      </div>
    </div>
  </motion.section>
);

const CVAnalysisSection = () => (
  <section id="cv-analysis" className="cv-analysis-section">
    <h2 className="section-title">Advanced CV Analysis Service</h2>
    <div className="cv-analysis-content">
      <motion.img 
        src={cvAnalysisPic} 
        alt="CV Analysis" 
        className="cv-analysis-image"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <div className="cv-analysis-text">
        <h3>Unlock Your Career Potential</h3>
        <p>
          Our advanced CV analysis service goes beyond traditional reviews. Using cutting-edge AI technology combined with expert human insight, we provide a comprehensive evaluation of your CV, tailored to your industry and career goals.
        </p>
        <h4>Why Choose Our CV Analysis?</h4>
        <ul>
          <li>In-depth assessment of your skills and experience</li>
          <li>Personalized recommendations for improvement</li>
          <li>Industry-specific insights and keyword optimization</li>
          <li>ATS (Applicant Tracking System) compatibility check</li>
          <li>Tailored job matches based on your CV content</li>
        </ul>
        <p>
          For just £4 per month, you'll receive ongoing CV analysis and job matching services, keeping your professional profile up-to-date and aligned with the latest industry trends.
        </p>
        <motion.a 
          href="#subscription-signup" 
          className="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your 7-Day Free Trial
        </motion.a>
      </div>
    </div>
  </section>
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
    <p>At Credolay, we offer more than just CV writing. Our team of CIPD-qualified HR professionals provides a holistic approach to your career development:</p>
    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      <motion.li variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
        Personalized job search planning based on current market trends
      </motion.li>
      <motion.li variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
        In-depth interview preparation with industry-specific mock interviews
      </motion.li>
      <motion.li variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
        Expert salary negotiation techniques
      </motion.li>
      <motion.li variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
        Long-term career path guidance
      </motion.li>
      <motion.li variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
        Effective networking strategies tailored to your industry
      </motion.li>
    </motion.ul>
    <motion.div 
      className="ai-warning"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <strong>Why avoid AI-generated content:</strong> While AI tools may seem convenient, they often produce generic, easily detectable content that can harm your application. Our human experts ensure your materials are authentic, ATS-friendly, and truly representative of your unique value.
    </motion.div>
  </section>
);

const PackagesSection = () => (
  <section id="packages" className="packages-section">
    <h2 className="section-title">Our Packages</h2>
    <div className="packages">
      <PackageCard
        title="Resume Enhancement"
        features={[
          "Professional resume review",
          "ATS-friendly formatting",
          "Keyword optimization",
          "One round of revisions"
        ]}
        price="£50"
        link="https://buy.stripe.com/cN29CF7aMdJQ30AcMS"
        buttonText="Get Started"
      />
      <PackageCard
        title="Career Boost Package"
        features={[
          "Everything in Resume Enhancement",
          "LinkedIn profile optimization",
          "Cover letter template",
          "Two rounds of revisions"
        ]}
        price="£150"
        link="https://buy.stripe.com/bIYaGJ52EcFMdFe007"
        buttonText="Choose This Package"
        featured
      />
      <PackageCard
        title="Executive Presence"
        features={[
          "Everything in Career Boost Package",
          "Personal branding strategy",
          "2 tailored articles for publication",
          "5 optimized LinkedIn posts",
          "Interview coaching session"
        ]}
        price="£300"
        link="https://buy.stripe.com/6oEcORcv6bBIcBaaEM"
        buttonText="Elevate Your Career"
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