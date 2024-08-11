import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import linkedinPic from '../assets/Linkedinpic.jpg';
import onlinePresencePic from '../assets/OnlinePresencepic.jpg';
import resourcePic from '../assets/Resourcepic.jpg';

function Home() {
  const [faq, setFaq] = useState([
    {
      question: "Do you offer any discounts or promotions?",
      answer: `Yes, Credolay occasionally offers discounts and promotions. Please check the website or contact our team for the latest offers.`,
      open: false
    },
    {
      question: "How long does the service take?",
      answer: `The turnaround time for our services can vary depending on the package and workload. However, we strive to deliver the following:
      \n\n- **Basic Package**: 5-7 business days
      \n- **Standard Package**: 7-10 business days
      \n- **Premium Package**: 10-14 business days`,
      open: false
    },
    {
      question: "Can I customize the packages?",
      answer: `Yes, we understand that individual needs may vary. We are happy to discuss customized packages to meet your specific requirements. Please contact our team to explore the options.`,
      open: false
    },
    {
      question: "Do you provide any free resources?",
      answer: `Yes, Credolay offers the following free resources:
      \n\n- Resume Writing Guide
      \n- LinkedIn Checklist
      \n- Interview Preparation Guide`,
      open: false
    },
    {
      question: "What is your refund policy?",
      answer: `Credolay has a 30-day money-back guarantee for all our packages. If you are not satisfied with our services, please contact us, and we will process a full refund.`,
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setFaq(faq.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
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
        <section className="feature-section">
          <div className="feature-content">
            <img src={linkedinPic} alt="LinkedIn Optimization" className="feature-image" />
            <div className="feature-text">
              <h2>Optimize Your LinkedIn</h2>
              <p>
                We will enhance your LinkedIn profile to attract recruiters and hiring managers. Our experts guarantee that your profile will stand out, giving you an edge in your job search.
              </p>
            </div>
          </div>
        </section>

        <section className="feature-section reverse">
          <div className="feature-content">
            <img src={onlinePresencePic} alt="Online Presence" className="feature-image" />
            <div className="feature-text">
              <h2>Enhance Your Online Presence</h2>
              <p>
                Our team will improve your online visibility and reputation across various platforms. We ensure your online presence is professional and appealing to potential employers.
              </p>
            </div>
          </div>
        </section>

        <section className="packages-section">
          <h2>Our Packages</h2>
          <div className="packages">
            <div className="package">
              <h3>Basic Package</h3>
              <p>Resume Enhancement with a Focus on Securing Job Interviews</p>
              <p>£50</p>
              <a href="https://buy.stripe.com/cN29CF7aMdJQ30AcMS" className="button">Choose Basic</a>
            </div>
            <div className="package">
              <h3>Standard Package</h3>
              <p>Comprehensive Resume and LinkedIn Profile Optimization</p>
              <p>£150</p>
              <a href="https://buy.stripe.com/bIYaGJ52EcFMdFe007" className="button">Choose Standard</a>
            </div>
            <div className="package">
              <h3>Premium Package</h3>
              <p>Resume, LinkedIn, and Targeted Content (2 Articles + 5 LinkedIn Posts)</p>
              <p>£300</p>
              <a href="https://buy.stripe.com/6oEcORcv6bBIcBaaEM" className="button">Choose Premium</a>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>Testimonials</h2>
          <div className="testimonials">
            <div className="testimonial">
              <p>"Credolay helped me revamp my CV and LinkedIn profile, and I got multiple callbacks within a week!"</p>
              <p>- John Dickson</p>
            </div>
            <div className="testimonial">
              <p>"The team at Credolay is professional and knowledgeable. They improved my online presence significantly."</p>
              <p>- Jane Smith</p>
            </div>
            <div className="testimonial">
              <p>"Thanks to Credolay, I found my dream job in no time. Highly recommended!"</p>
              <p>- Mark Johnson</p>
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

        <section className="contact-us">
          <h2>Contact Us</h2>
          <p>For more information or personalized assistance, reach out to us:</p>
          <p>Email: <a href="mailto:admin@credolay.com">admin@credolay.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/447918262629">+44 7918 262629</a></p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
