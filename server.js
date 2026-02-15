const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to check if request is from a browser or Roblox
const browserBlocker = (req, res, next) => {
  const userAgent = req.get('user-agent') || '';
  const accept = req.get('accept') || '';
  
  // Check if this looks like a browser request
  const browserIndicators = [
    /mozilla/i,
    /chrome/i,
    /safari/i,
    /firefox/i,
    /edge/i,
    /opera/i,
  ];
  
  const isBrowser = browserIndicators.some(indicator => indicator.test(userAgent)) ||
                    accept.includes('text/html');
  
  // Block browser access
  if (isBrowser) {
    return res.status(403).send('Access Denied');
  }
  
  next();
};

// Health check endpoint (for Railway)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Script endpoint with browser blocking
app.get('/script', browserBlocker, (req, res) => {
  const scriptContent = `print("this is in testing")`;
  res.set('Content-Type', 'text/plain');
  res.send(scriptContent);
});

// Root endpoint also serves the script with browser blocking
app.get('/', browserBlocker, (req, res) => {
  const scriptContent = `print("this is in testing")`;
  res.set('Content-Type', 'text/plain');
  res.send(scriptContent);
});

// 404 for other routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LostWare Script Server running on http://localhost:${PORT}`);
  console.log(`Roblox: loadstring(game:HttpGetAsync("http://localhost:${PORT}"))() or`);
  console.log(`Roblox: loadstring(game:HttpGetAsync("http://localhost:${PORT}/script"))()`);
});
