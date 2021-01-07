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
  const { customURL, longURL } = req.body;
  const regExp = /[a-z0-9]/gi;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (customURL) {
    // validate short URL
    if (customURL.length < 4) {
      return res.send('Too short. Must be at least 4 charaters long!');
    }
    if (customURL.match(regExp).join('') !== customURL) {
      return res.send('Only letters and numbers allowed!');
    }
    res.send(`Your Short Code is: ${customURL}`);
  } else {
    let generatedURL = '';
    for (let index = 0; index < 6; index += 1) {
      const idx = Math.floor((Math.random() * characters.length));
      generatedURL += characters[idx];
    }
    res.status(200).send(generatedURL);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
