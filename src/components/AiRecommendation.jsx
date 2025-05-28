import React, { useState, useEffect } from 'react';

function StockRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/stock_recommendations.json')
      .then(response => response.json())
      .then(data => {
        setRecommendations(data.recommendations);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ direction: 'rtl', textAlign: 'right' }}>
      <h2>توصيات الأسهم</h2>
      <ul>
        {recommendations.map((stock, index) => (
          <li key={index}>
            <h3>{stock.symbol} - {stock.company}</h3>
            <p>سعر الشراء: {stock.buy_price}$</p>
            <p>الهدف: {stock.target_price}$</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockRecommendations;
