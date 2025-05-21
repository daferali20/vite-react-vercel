import { useState } from 'react';

export default function AiRecommendation() {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setRecommendation('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'أنت خبير في الأسهم، تقدم توصيات مختصرة بناءً على السعر الحالي.',
            },
            {
              role: 'user',
              content: 'سعر سهم TSLA الآن 172 دولار، هل تنصح بشراء أو بيع؟',
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      console.log(data);
      setRecommendation(reply || 'لم يتم توليد توصية.');
    } catch (error) {
      console.error(error);
      setRecommendation('حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🤖 توصيات الذكاء الاصطناعي</h2>
      <button onClick={askAI} disabled={loading}>
        {loading ? 'جاري التحليل...' : 'اطلب توصية'}
      </button>
      {recommendation && (
        <p style={{ marginTop: '1rem', direction: 'rtl' }}>📢 التوصية: {recommendation}</p>
      )}
    </div>
  );
}
