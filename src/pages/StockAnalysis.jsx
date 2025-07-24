import React, { useState } from 'react';
import './StockAnalysis.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = '9XNFC22RVJVE85SW';

const StockAnalysis = () => {
  const [symbol, setSymbol] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAnalysis(null);
    setChartData(null);
    setLoading(true);
    try {
      // Fetch quote
      const quoteRes = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      const quoteData = await quoteRes.json();
      if (quoteData["Global Quote"] && quoteData["Global Quote"]["05. price"]) {
        setAnalysis({
          symbol: quoteData["Global Quote"]["01. symbol"],
          price: quoteData["Global Quote"]["05. price"],
          change: quoteData["Global Quote"]["09. change"],
          changePercent: quoteData["Global Quote"]["10. change percent"],
          open: quoteData["Global Quote"]["02. open"],
          high: quoteData["Global Quote"]["03. high"],
          low: quoteData["Global Quote"]["04. low"],
          previousClose: quoteData["Global Quote"]["08. previous close"],
          volume: quoteData["Global Quote"]["06. volume"],
          latestTradingDay: quoteData["Global Quote"]["07. latest trading day"]
        });
      } else {
        setError('No data found for this symbol.');
        setLoading(false);
        return;
      }
      // Fetch daily time series for chart
      const chartRes = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      );
      const chartJson = await chartRes.json();
      const timeSeries = chartJson["Time Series (Daily)"];
      if (timeSeries) {
        const dates = Object.keys(timeSeries).slice(0, 30).reverse(); 
        const closes = dates.map(date => parseFloat(timeSeries[date]["4. close"]));
        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol} Closing Price` ,
              data: closes,
              fill: false,
              borderColor: '#61dafb',
              backgroundColor: '#61dafb',
              tension: 0.2
            }
          ]
        });
      } else {
        setChartData(null);
      }
    } catch (err) {
      setError('Error fetching data.');
    }
    setLoading(false);
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
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Analyze'}</button>
        </form>
        {error && <div className="analysis-message" style={{ color: 'red' }}>{error}</div>}
        {analysis && (
          <div className="analysis-results">
            <div className="stock-header">
              <h2>{analysis.symbol}</h2>
              <div className="price-info">
                <span className="price">${analysis.price}</span>
                <span className={`change ${Number(analysis.change) >= 0 ? 'positive' : 'negative'}`}>
                  {analysis.change} ({analysis.changePercent})
                </span>
              </div>
            </div>
            <div className="stock-details">
              <p><strong>Open:</strong> ${analysis.open}</p>
              <p><strong>High:</strong> ${analysis.high}</p>
              <p><strong>Low:</strong> ${analysis.low}</p>
              <p><strong>Previous Close:</strong> ${analysis.previousClose}</p>
              <p><strong>Volume:</strong> {analysis.volume}</p>
              <p><strong>Latest Trading Day:</strong> {analysis.latestTradingDay}</p>
            </div>
          </div>
        )}
        {chartData && (
          <div style={{ marginTop: 32 }}>
            <h3>Last 30 Days Closing Price</h3>
            <Line data={chartData} options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' },
                title: { display: false }
              },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Price (USD)' } }
              }
            }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAnalysis; 