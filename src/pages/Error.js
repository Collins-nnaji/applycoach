import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Error.css';

const Error = () => (
  <div className="error">
    <Header />
    <div className="container">
      <main className="main-content">
        <h1>Error</h1>
        <p>Something went wrong. Please try again later.</p>
      </main>
    </div>
    <Footer />
  </div>
);

export default Error;
