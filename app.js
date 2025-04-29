const express = require('express');
// Use native fetch if running Node.js v18+
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 3000;

// Use express's built-in JSON parser
app.use(express.json());

// Fetch data from fake API
app.get('/data', async (req, res) => {
  try {
    const response = await fetch('https://fakeapi.net/users');
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Error fetching data');
  }
});

// Write data to fake API
app.post('/data', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Post error:', error);
    res.status(500).send('Error posting data');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
