const express = require('express');
const app = express();
const morgan = require('morgan'); // use your custom logger if required
const shortid = require('shortid');

const PORT = 5000;
app.use(express.json());

// Custom Logging Middleware (Mandatory Logging Integration)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${JSON.stringify(req.body)}`);
  next();
});

// In-memory store
const urls = {};

// POST: Shorten URL
app.post('/api/shorten', (req, res) => {
  const { originalUrl, validityMinutes = 30, customCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  let shortcode = customCode || shortid.generate();

  if (customCode && urls[customCode]) {
    return res.status(400).json({ error: 'Custom shortcode already exists' });
  }

  const expiry = Date.now() + validityMinutes * 60 * 1000;

  urls[shortcode] = { originalUrl, expiry };

  return res.json({ shortUrl: `http://localhost:${PORT}/${shortcode}` });
});

// GET: Redirect
app.get('/:code', (req, res) => {
  const { code } = req.params;
  const entry = urls[code];

  if (!entry) return res.status(404).send('Short URL not found');
  if (Date.now() > entry.expiry) return res.status(410).send('Link expired');

  return res.redirect(entry.originalUrl);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
