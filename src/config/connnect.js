const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.URI + process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      '%s\x1b[33m\x1b[1m%s\x1b[0m%s\x1b[33m\x1b[1m%s \x1b[0m',
      'Connected to MongoDB, URI: ',
      process.env.URI,
      ' Databse: ',
      process.env.DB_NAME
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = connect;
