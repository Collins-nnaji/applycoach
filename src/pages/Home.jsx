import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import jobPic from '../assets/Jobpic.jpg';
import linkedinPic from '../assets/Linkedinpic.jpg';
import onlinePresencePic from '../assets/OnlinePresencepic.jpg';

function Home() {
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

        <section className="feature-section reverse">
          <div className="feature-content">
            <img src={jobPic} alt="Job Listings" className="feature-image" />
            <div className="feature-text">
              <h2>Find Your Dream Job</h2>
              <p>
                We provide tailored job listings based on your skills and preferences. With our support, you can confidently apply to jobs and track your applications with ease.
              </p>
            </div>
          </div>
        </section>

        <section className="packages-section">
          <h2>Our Packages</h2>
          <div className="packages">
            <div className="package">
              <h3>Basic Package</h3>
              <p>CV Optimization with guaranteed job callbacks</p>
              <p>£50</p>
              <a href="https://buy.stripe.com/cN29CF7aMdJQ30AcMS" className="button">Choose Basic</a>
            </div>
            <div className="package">
              <h3>Standard Package</h3>
              <p>Resume + LinkedIn Optimization</p>
              <p>£150</p>
              <a href="https://buy.stripe.com/bIYaGJ52EcFMdFe007" className="button">Choose Standard</a>
            </div>
            <div className="package">
              <h3>Premium Package</h3>
              <p>Resume + LinkedIn + 2 Articles + 5 LinkedIn Posts</p>
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
      <p>- John Doe</p>
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
