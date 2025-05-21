import React, { useState } from 'react';

function StockRecommendationBox() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation(null);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `
أعطني توصية لحظية لسهم مناسب للشراء اليوم بصيغة JSON تحتوي على:
{
  "symbol": "رمز السهم",
  "current_price": "سعر السوق الحالي",
  "buy_price": "سعر الشراء المقترح",
  "target_price": "هدف البيع الأولي",
  "stop_loss": "وقف الخسارة"
}
              `.trim(),
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      setRecommendation(result);
    } catch (error) {
      console.error('خطأ في جلب التوصية:', error);
      setRecommendation({ error: 'تعذر جلب التوصية حالياً.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '400px', margin: '2rem auto', textAlign: 'right', direction: 'rtl' }}>
      <h2>📊 توصية الذكاء الاصطناعي</h2>
      <button onClick={getRecommendation} disabled={loading}>
        {loading ? '...جاري التحليل' : '🔍 احصل على توصية'}
      </button>

      {recommendation && !recommendation.error && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          <li><strong>📈 السهم:</strong> {recommendation.symbol}</li>
          <li><strong>💲 سعر السوق:</strong> {recommendation.current_price}</li>
          <li><strong>🛒 سعر الشراء:</strong> {recommendation.buy_price}</li>
          <li><strong>🎯 هدف البيع:</strong> {recommendation.target_price}</li>
          <li><strong>🛑 وقف الخسارة:</strong> {recommendation.stop_loss}</li>
        </ul>
      )}

      {recommendation?.error && (
        <p style={{ marginTop: '1rem', color: 'red' }}>{recommendation.error}</p>
      )}
    </div>
  );
}

export default StockRecommendationBox;
