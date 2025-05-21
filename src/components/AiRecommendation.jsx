import React, { useState } from 'react';

function AiRecommendation() {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    setRecommendation('');

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
              content: 'أعطني توصية لحظية لسهم مناسب للشراء اليوم بناءً على بيانات السوق.',
            },
          ],
        }),
      });
<div className="recommendation-box">
  <h3>🧠 التوصية اليوم</h3>
  <ul>
    <li><strong>السهم:</strong> AAPL</li>
    <li><strong>سعر السوق:</strong> $182.10</li>
    <li><strong>سعر الشراء المقترح:</strong> $181.50</li>
    <li><strong>هدف البيع الأولي:</strong> $190.00</li>
    <li><strong>وقف الخسارة:</strong> $178.00</li>
  </ul>
</div>

      const data = await response.json();

      const aiReply = data?.choices?.[0]?.message?.content || 'لم يتم توليد توصية.';
      setRecommendation(aiReply);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب التوصية:', error);
      setRecommendation('تعذر جلب التوصية حالياً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>🤖 توصية الذكاء الاصطناعي</h2>
      <button onClick={getRecommendation} disabled={loading}>
        {loading ? 'جاري التحليل...' : 'احصل على توصية'}
      </button>
      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        📢 التوصية: {recommendation}
      </p>
    </div>
  );
}

export default AiRecommendation;
