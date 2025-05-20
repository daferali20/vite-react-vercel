import React, { useState, useEffect } from 'react';

export default function App() {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_TWELVE_API_KEY; // تأكد أنك أضفته في .env

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=AAPL&apikey=${apiKey}`
        );
        const data = await response.json();
        if (data.price) {
          setStockData(data.price);
        } else {
          setError("لم يتم العثور على البيانات.");
        }
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات.");
      }
    };

    fetchStock();
    const interval = setInterval(fetchStock, 10000); // تحديث كل 10 ثوانٍ

    return () => clearInterval(interval);
  }, [apiKey]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📈 سعر سهم AAPL الآن</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {stockData ? (
        <p>السعر الحالي: {stockData} $</p>
      ) : (
        <p>جاري تحميل البيانات...</p>
      )}
    </div>
  );
}
