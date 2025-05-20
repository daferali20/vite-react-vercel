import React, { useState, useEffect } from 'react';

export default function App() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // بيانات وهمية كل 5 ثوانٍ (يمكنك استبدالها بـ API لاحقًا)
    const interval = setInterval(() => {
      const randomStock = ['AAPL', 'TSLA', 'MSFT', 'GOOG'][Math.floor(Math.random() * 4)];
      const action = Math.random() > 0.5 ? 'شراء' : 'بيع';
      const rec = `${new Date().toLocaleTimeString()} - ${action} ${randomStock}`;
      setRecommendations((prev) => [rec, ...prev]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📈 توصيات الأسهم بالذكاء الاصطناعي</h1>
      <p>أهلاً بك! سيتم عرض التوصيات هنا بشكل لحظي قريباً.</p>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
