const mongoose = require('mongoose');

const { Schema } = mongoose;

const URLObjectSchema = new Schema({
  longURL: {
    type: String,
    required: true,
    trim: true,
  },
  shortURL: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  lastAccessed: {
    type: Date,
    default: Date.now(),
  },
  numberOfAccesses: {
    type: Number,
    default: 1,
  },
});

const URLObject = mongoose.model('URLObject', URLObjectSchema);

module.exports = URLObject;
