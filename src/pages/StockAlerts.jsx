import React, { useState } from 'react';
import './StockAlerts.css';

const StockAlerts = () => {
  const [alertData, setAlertData] = useState({
    symbol: '',
    price: '',
    condition: 'above'
  });
  const [alerts, setAlerts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now(),
      ...alertData
    };
    setAlerts([...alerts, newAlert]);
    setAlertData({ symbol: '', price: '', condition: 'above' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlertData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="stock-alerts">
      <div className="alerts-container">
        <h1>Set Stock Alerts</h1>
        <form className="alert-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="symbol"
              placeholder="Stock Symbol (e.g., Bitcoin)"
              value={alertData.symbol}
              onChange={handleChange}

              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              placeholder="Target Price"
              value={alertData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select name="condition" value={alertData.condition} onChange={handleChange}>
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>
          <button type="submit">Set Alert</button>
        </form>

        <div className="alerts-list">
          <h2>Active Alerts</h2>
          {alerts.length === 0 ? (
            <p className="no-alerts">No active alerts. Add one above!</p>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="alert-card">
                <div className="alert-info">
                  <h3>{alert.symbol}</h3>
                  <p>Alert when price is {alert.condition} ${alert.price}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deleteAlert(alert.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StockAlerts; 