import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ prediction: 'Error', confidence: 0 });
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🕵️‍♀️ Fake News Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter news headline or article..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Detect Fake News'}
        </button>
      </form>

      {result && (
        <div className={`result ${result.prediction === 'Real' ? 'real' : 'fake'}`}>
          <h2>{result.prediction === 'Real' ? '✅ Real News' : '❌ Fake News'}</h2>
          <p>Confidence: {result.confidence?.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
