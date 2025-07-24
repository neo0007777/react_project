import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSectionClick = (path) => {
    navigate(path);
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
      </section>
      
      <section className="scroll-section analysis-alerts-section">
        <div className="section-content">
          <div className="section-header">
            <h2>Stock Analysis & Alerts</h2>
            <p>Get detailed insights and set personalized alerts for your stocks</p>
          </div>
          
          <div className="combined-features">
            <div className="analysis-features">
              <h3>Analysis Tools</h3>
              <div className="feature-grid">
                <div className="feature">
                  <h4>Real-time Data</h4>
                  <p>Access live market data and trends</p>
                </div>
                <div className="feature">
                  <h4>Technical Analysis</h4>
                  <p>Advanced charts and indicators</p>
                </div>
                <div className="feature">
                  <h4>Market Insights</h4>
                  <p>Expert analysis and predictions</p>
                </div>
              </div>
              <button 
                className="section-button"
                onClick={() => handleSectionClick('/analysis')}
              >
                Start Analysis
              </button>
            </div>

            <div className="alerts-features">
              <h3>Alert Features</h3>
              <div className="feature-grid">
                <div className="feature">
                  <h4>Custom Alerts</h4>
                  <p>Set your own price thresholds</p>
                </div>
                <div className="feature">
                  <h4>Instant Notifications</h4>
                  <p>Get notified in real-time</p>
                </div>
                <div className="feature">
                  <h4>Multiple Conditions</h4>
                  <p>Create complex alert rules</p>
                </div>
              </div>
              <button 
                className="section-button"
                onClick={() => handleSectionClick('/alerts')}
              >
                Set Alerts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 