import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/shorten', {
        originalUrl,
        customCode: customCode || undefined,
        validityMinutes: Number(validity)
      });

      setShortUrl(res.data.shortUrl);
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React URL Shortener</h1>
      <input
        type="text"
        placeholder="Original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      /><br/><br/>
      <input
        type="text"
        placeholder="Custom Shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      /><br/><br/>
      <input
        type="number"
        placeholder="Validity in Minutes"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      /><br/><br/>
      <button onClick={handleSubmit}>Shorten URL</button>
      <br/><br/>
      {shortUrl && <div>Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a></div>}
    </div>
  );
};

export default App;
