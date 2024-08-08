import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Error.css';

function Error() {
  return (
    <div className="error-page">
      <Header />
      <main className="main-content">
        <section className="error-message">
          <h2>Error</h2>
          <p>Something went wrong. Please try again later.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Error;
