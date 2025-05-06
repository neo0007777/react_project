import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About StockInsight</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At StockInsight, we're dedicated to providing investors with powerful tools and insights
            to make informed investment decisions. Our platform combines cutting-edge technology with
            comprehensive market analysis to help you stay ahead in the stock market.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Real-time Analysis</h3>
              <p>Get instant insights into market trends and stock performance with our advanced analytics tools.</p>
            </div>
            <div className="feature">
              <h3>Custom Alerts</h3>
              <p>Set personalized alerts for price movements and market changes to never miss an opportunity.</p>
            </div>
            <div className="feature">
              <h3>Expert Insights</h3>
              <p>Access professional analysis and market predictions from our team of experienced analysts.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of experienced financial analysts, data scientists, and software engineers
            who are passionate about making stock market analysis accessible to everyone. We combine
            technical expertise with market knowledge to deliver the best possible experience to our users.
          </p>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Reach out to us through our
            contact page or email us directly at support@stockinsight.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 