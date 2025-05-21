import AiRecommendation from './components/AiRecommendation';

function App() {
  return (
    <div>
      <AiRecommendation />
      <h1>📊 بيانات السوق اللحظية</h1>
      <StockPrice symbol="AAPL" />
      <StockPrice symbol="TSLA" />
    </div>
  );
}

export default App;
