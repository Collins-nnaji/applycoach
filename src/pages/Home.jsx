import React, { useState } from 'react';
import Header from '../components/Header';
import './Home.css';
import linkedinPic from '../assets/Linkedinpic.jpg';
import onlinePresencePic from '../assets/OnlinePresencepic.jpg';
import cvPic from '../assets/CVpic.jpg';
import resourcePic from '../assets/Resourcepic.jpg';

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
    }
  ]);

  const toggleFAQ = index => {
    setFaq(faq.map((item, i) => {
      if (i === index) {
        item.open = !item.open;
      } else {
        item.open = false;
      }
      return item;
    }));
  };

  return (
    <div className="home">
      <Header />
      <header className="hero">
        <h1 className="title">Welcome to Credolay</h1>
        <p className="subtitle">
          Your trusted partner for authentic career growth and strategic job placement. Let us help you stand out to employers with genuine, tailored career solutions.
        </p>
      </header>

      <main className="main-content">
        <section className="features-section">
          <div className="feature-item">
            <img src={cvPic} alt="CV Review" className="feature-image" />
            <div className="feature-text">
              <h2>Authentic CV Enhancement</h2>
              <p>
                Our CIPD-qualified experts craft genuine, impactful CVs that highlight your unique strengths and experiences. We go beyond buzzwords to create a CV that truly represents you and resonates with employers.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src={linkedinPic} alt="LinkedIn Optimization" className="feature-image" />
            <div className="feature-text">
              <h2>Strategic LinkedIn Optimization</h2>
              <p>
                We enhance your LinkedIn profile to attract recruiters and hiring managers authentically. Our approach ensures your profile stands out without relying on AI-generated content that could harm your credibility.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src={onlinePresencePic} alt="Online Presence" className="feature-image" />
            <div className="feature-text">
              <h2>Holistic Online Presence</h2>
              <p>
                Our team improves your online visibility across platforms, ensuring a consistent and professional image. We focus on creating genuine content that showcases your expertise and appeals to potential employers.
              </p>
            </div>
          </div>
        </section>

        <section className="job-search-strategy-section">
          <h2>Comprehensive Career Growth Strategy</h2>
          <p>At Credolay, we offer more than just CV writing. Our team of CIPD-qualified HR professionals provides a holistic approach to your career development:</p>
          <ul>
            <li>Personalized job search planning based on current market trends</li>
            <li>In-depth interview preparation with industry-specific mock interviews</li>
            <li>Expert salary negotiation techniques</li>
            <li>Long-term career path guidance</li>
            <li>Effective networking strategies tailored to your industry</li>
          </ul>
          <p className="ai-warning">
            <strong>Why avoid AI-generated content:</strong> While AI tools may seem convenient, they often produce generic, easily detectable content that can harm your application. Our human experts ensure your materials are authentic, ATS-friendly, and truly representative of your unique value.
          </p>
          <a href="#contact-us" className="button">Start Your Authentic Career Journey</a>
        </section>

        <section className="packages-section" id="packages-section">
          <h2>Our Services</h2>
          <div className="packages">
            <div className="package">
              <h3>Resume Enhancement</h3>
              <ul>
                <li>Professional resume review</li>
                <li>ATS-friendly formatting</li>
                <li>Keyword optimization</li>
                <li>One round of revisions</li>
              </ul>
              <p className="price">£50</p>
              <a href="https://buy.stripe.com/cN29CF7aMdJQ30AcMS" className="button">Get Started</a>
            </div>
            <div className="package featured">
              <h3>Career Boost Package</h3>
              <ul>
                <li>Everything in Resume Enhancement</li>
                <li>LinkedIn profile optimization</li>
                <li>Cover letter template</li>
                <li>Two rounds of revisions</li>
              </ul>
              <p className="price">£150</p>
              <a href="https://buy.stripe.com/bIYaGJ52EcFMdFe007" className="button">Choose This Package</a>
            </div>
            <div className="package">
              <h3>Executive Presence</h3>
              <ul>
                <li>Everything in Career Boost Package</li>
                <li>Personal branding strategy</li>
                <li>2 tailored articles for publication</li>
                <li>5 optimized LinkedIn posts</li>
                <li>Interview coaching session</li>
              </ul>
              <p className="price">£300</p>
              <a href="https://buy.stripe.com/6oEcORcv6bBIcBaaEM" className="button">Elevate Your Career</a>
            </div>
          </div>
        </section>

        <section className="resources-section">
          <h2>Free Career Resources</h2>
          <div className="resources">
            <div className="resource">
              <img src={resourcePic} alt="Authentic Resume Writing Guide" className="resource-image" />
              <p className="resource-title">Authentic Resume Writing Guide</p>
              <a href="/resume-writing-guide.pdf" className="button" download>Download</a>
            </div>
            <div className="resource">
              <img src={resourcePic} alt="LinkedIn Optimization Checklist" className="resource-image" />
              <p className="resource-title">LinkedIn Optimization Checklist</p>
              <a href="/linkedin-checklist.pdf" className="button" download>Download</a>
            </div>
            <div className="resource">
              <img src={resourcePic} alt="Comprehensive Interview Guide" className="resource-image" />
              <p className="resource-title">Comprehensive Interview Guide</p>
              <a href="/interview-guide.pdf" className="button" download>Download</a>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faq.map((item, index) => (
              <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
                <h3>{item.question}</h3>
                <p className={item.open ? 'open' : ''}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-us" id="contact-us">
          <h2>Contact Our Expert Team</h2>
          <p>For personalized career guidance and authentic profile development, reach out to our CIPD-qualified professionals:</p>
          <p>Email: <a href="mailto:admin@credolay.com">admin@credolay.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/447918262629">+44 7918 262629</a></p>
        </section>
      </main>
    </div>
  );
}

export default Home;