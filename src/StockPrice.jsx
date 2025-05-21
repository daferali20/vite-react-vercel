import React, { useEffect, useState } from 'react';

function StockPrice({ symbol = 'AAPL' }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TWELVE_API_KEY;

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data.price) {
          setPrice(data.price);
        } else {
          console.error('خطأ في البيانات:', data);
        }
      } catch (error) {
        console.error('فشل جلب السعر:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, [symbol]);

  if (loading) return <p>جاري تحميل سعر {symbol}...</p>;

  return (
    <div>
      <h2>سعر سهم {symbol} الآن:</h2>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${price}</p>
    </div>
  );
}

export default StockPrice;
