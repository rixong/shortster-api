const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.post('/', (req, res) => {
  console.log(req.body)
  const shortCode = `shortCode from ${req.body.customURL}`;
  res.send(`My Short Code - ${shortCode}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
