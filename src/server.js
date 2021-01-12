const express = require('express');
const cors = require('cors');
require('./mongoose');
const URLObject = require('./URLModel');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/:url', async (req, res) => {
  try {
    const urlObj = await URLObject.findOne({ shortURL: req.params.url });
    urlObj.numberOfAccesses += 1;
    urlObj.lastAccessed = Date.now();
    await urlObj.save();
    res.status(201).send(urlObj);
  } catch (e) {
    res.status(401).send({ error: 'Not a valid short URL.' });
  }
});

app.get('/:url/stats', async (req, res) => {
  try {
    const urlObj = await URLObject.findOne({ shortURL: req.params.url });
    if (!urlObj) {
      return res.status(401).send({ error: 'Not a valid short URL.' });
    }
    res.send(urlObj);
  } catch (e) {
    res.status(500).send({ error: 'Error!' });
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
      return res.status(400).send({ error: 'Too short. Must be at least 4 characters long!' });
    }
    if (customURL.match(regExp).join('') !== customURL) {
      return res.status(400).send({ error: 'Only letters and numbers allowed!' });
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

module.exports = app;
