const mongoose = require('mongoose');
const URLObject = require('./URLModel');

const urlData = { longURL: 'https://movingworlds.org/', shortURL: 'Moving' };

describe('URL Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('create & save URL successfully', async () => {
    const validURL = new URLObject(urlData);
    const savedURL = await validURL.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedURL._id).toBeDefined();
    expect(savedURL.longURL).toBe(urlData.longURL);
    expect(savedURL.shortURL).toBe(urlData.shortURL);
    expect(savedURL.createdAt).toBeDefined();
    expect(savedURL.lastAccessed).toBeDefined();
    expect(savedURL.numberOfAccesses).toBeDefined();
  });

  it('insert url successfully, but the field does not defined in schema should be undefined', async () => {
    const urlWithInvalidField = new URLObject({ longURL: 'https://movingworlds.org/', shortURL: 'Moving', link: 'Here we go!' });
    const savedURLWithInvalidField = await urlWithInvalidField.save();
    expect(savedURLWithInvalidField._id).toBeDefined();
    expect(savedURLWithInvalidField.link).toBeUndefined();
  });

  it('create user without required field should failed', async () => {
    const urlWithoutRequiredField = new URLObject({ longURL: 'www.cnn.com' });
    let err;
    try {
      const savedURLWithoutRequiredField = await urlWithoutRequiredField.save();
      error = savedURLWithoutRequiredField;
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.shortURL).toBeDefined();
  });

  it('Should save URL to database', async done => {
    const res = await request.post('/')
      .send({
        longURL: 'https://movingworlds.org/',
        shortURL: 'Moving',
      });

    // Searches the user in the database
    const url = await URLObject.findOne({ shortURL: 'Moving' });
    expect(url.shortURL).toBeTruthy();
    expect(user.longURL).toBeTruthy();
    done();
  })

})