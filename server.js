const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const PORT = process.env.PORT || 1409;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Connected!'));

app.set('view engine', 'ejs');
app.use('', require('./routes/routes'));

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)});
