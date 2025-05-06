import React, { useState } from 'react';
import './StockAnalysis.css';

const StockAnalysis = () => {
  const [symbol, setSymbol] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate analysis result
    setAnalysis({
      symbol: symbol,
      price: (Math.random() * 1000).toFixed(2),
      change: (Math.random() > 0.5 ? '+' : '-') + (Math.random() * 5).toFixed(2) + '%',
      recommendation: ['Buy', 'Hold', 'Sell'][Math.floor(Math.random() * 3)],
      summary: 'Analysis completed successfully.'
    });
  };

  return (
    <div className="stock-analysis">
      <div className="analysis-container">
        <h1>Stock Analysis</h1>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
          <button type="submit">Analyze</button>
        </form>
        
        {analysis && (
          <div className="analysis-results">
            <div className="stock-header">
              <h2>{analysis.symbol}</h2>
              <div className="price-info">
                <span className="price">${analysis.price}</span>
                <span className={`change ${analysis.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {analysis.change}
                </span>
              </div>
            </div>
            <div className="recommendation">
              <h3>Recommendation: <span className={analysis.recommendation.toLowerCase()}>{analysis.recommendation}</span></h3>
              <p>{analysis.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAnalysis; 