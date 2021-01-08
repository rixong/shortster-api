const express = require('express');
const cors = require('cors');
require('./mongoose');
const URLObject = require('./URLModel');

const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/:url', async (req, res) => {
  try {
    const url = await URLObject.findOne({ shortURL: req.params.url });
    url.numberOfAccesses += 1;
    url.lastAccessed = Date.now();
    await url.save();
    res.send(url.longURL);
  } catch (e) {
    res.send(e);
  }
});

app.get('/:url/stats', async (req, res) => {
  try {
    const url = await URLObject.findOne({ shortURL: req.params.url });
    res.send(url);
  } catch (e) {
    res.send(e);
  }
});

app.post('/', async (req, res) => {
  const { customURL, longURL } = req.body;
  const regExp = /[a-z0-9]/gi;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newURL = {};
  let generatedURL = '';
  if (customURL) {
    // Validate custom URL
    if (customURL.length < 4) {
      return res.send('Too short. Must be at least 4 charaters long!');
    }
    if (customURL.match(regExp).join('') !== customURL) {
      return res.send('Only letters and numbers allowed!');
    }
    generatedURL = customURL;

    // If no short URL specified, generate URL
  } else {
    for (let index = 0; index < 6; index += 1) {
      const idx = Math.floor((Math.random() * characters.length));
      generatedURL += characters[idx];
    }
  }
  newURL = new URLObject({
    longURL,
    shortURL: generatedURL,
  });
  await newURL.save();
  res.status(200).send(newURL);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
