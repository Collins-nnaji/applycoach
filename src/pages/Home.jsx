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
      question: "How long does the service take?",
      answer: `The turnaround time for our services can vary depending on the package and workload. However, we strive to deliver within 5-14 business days, depending on the chosen package.`,
      open: false
    },
    {
      question: "Can I customize the packages?",
      answer: `Yes, we understand that individual needs may vary. We are happy to discuss customized packages to meet your specific requirements. Please contact our team to explore the options.`,
      open: false
    },
    {
      question: "Do you provide any free resources?",
      answer: `Yes, Credolay offers free resources including a Resume Writing Guide, LinkedIn Checklist, and Interview Preparation Guide.`,
      open: false
    },
    {
      question: "What is your refund policy?",
      answer: `Credolay has a 30-day money-back guarantee for all our packages. If you are not satisfied with our services, please contact us, and we will process a full refund.`,
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
          Your trusted partner for career growth and job placement. Let us help you find the perfect job, optimize your resume, LinkedIn, and online presence to stand out to employers.
        </p>
      </header>

      <main className="main-content">
        <section className="features-section">
          <div className="feature-item">
            <img src={cvPic} alt="CV Review" className="feature-image" />
            <div className="feature-text">
              <h2>Professional CV Review</h2>
              <p>
                Our expert team will thoroughly review and enhance your CV to highlight your strengths and achievements. We ensure your CV is tailored to catch the eye of recruiters and hiring managers in your target industry.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src={linkedinPic} alt="LinkedIn Optimization" className="feature-image" />
            <div className="feature-text">
              <h2>Optimize Your LinkedIn</h2>
              <p>
                We will enhance your LinkedIn profile to attract recruiters and hiring managers. Our experts guarantee that your profile will stand out, giving you an edge in your job search.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src={onlinePresencePic} alt="Online Presence" className="feature-image" />
            <div className="feature-text">
              <h2>Enhance Your Online Presence</h2>
              <p>
                Our team will improve your online visibility and reputation across various platforms. We ensure your online presence is professional and appealing to potential employers.
              </p>
            </div>
          </div>
        </section>

        <section className="job-search-strategy-section">
          <h2>Comprehensive Job Search Strategy</h2>
          <p>At Credolay, we don't just help with your CV and online presence. We provide a holistic approach to your job search:</p>
          <ul>
            <li>Personalized job search planning</li>
            <li>Interview preparation and mock interviews</li>
            <li>Salary negotiation techniques</li>
            <li>Career path guidance</li>
            <li>Networking strategies</li>
          </ul>
          <a href="#contact-us" className="button">Get Started Today</a>
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
          <h2>Free Resources</h2>
          <div className="resources">
            <div className="resource">
              <img src={resourcePic} alt="Resume Writing Guide" className="resource-image" />
              <p className="resource-title">Resume Writing Guide</p>
              <a href="/resume-writing-guide.pdf" className="button" download>Download</a>
            </div>
            <div className="resource">
              <img src={resourcePic} alt="LinkedIn Checklist" className="resource-image" />
              <p className="resource-title">LinkedIn Checklist</p>
              <a href="/linkedin-checklist.pdf" className="button" download>Download</a>
            </div>
            <div className="resource">
              <img src={resourcePic} alt="Interview Guide" className="resource-image" />
              <p className="resource-title">Interview Guide</p>
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
          <h2>Contact Us</h2>
          <p>For more information or personalized assistance, reach out to us:</p>
          <p>Email: <a href="mailto:admin@credolay.com">admin@credolay.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/447918262629">+44 7918 262629</a></p>
        </section>
      </main>
    </div>
  );
}

export default Home;