const express = require('express');
const app = express();
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbName = 'test';

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
const webRouter = require('./routes/web');
app.use('/', webRouter); 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});