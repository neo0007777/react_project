import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import StockAnalysis from './StockAnalysis.jsx';
import StockAlerts from './StockAlerts.jsx';
const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Real-time Analysis',
      description: 'Get instant insights into market trends and stock performance'
    },
    {
      title: 'Custom Alerts',
      description: 'Set personalized alerts for price movements and market changes'
    },
    {
      title: 'Expert Insights',
      description: 'Access professional analysis and market predictions'
    }
  ];

  const handleAnalysisClick = () => {
    navigate('/analysis');
  };

  const handleAlertsClick = () => {
    navigate('/alerts');
  };

  return (
    <div className="home">
      <section className="hero-section">
        <h1>
          <span className="word">Welcome</span>
          <span className="word">to</span>
          <span className="word">StockInsight</span>
        </h1>
        <p className="subtitle">Your comprehensive platform for stock market analysis and insights</p>
        <div className="cta-buttons">
          <button onClick={handleAnalysisClick} className="cta-button primary">Start Analysis</button>
          <button onClick={handleAlertsClick} className="cta-button secondary">Set Alerts</button>
        </div>
      </section>
      
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 