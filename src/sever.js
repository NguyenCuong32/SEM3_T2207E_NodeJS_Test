const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MongoDB_URL)

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan('common'));

app.listen(8000, () => {
  console.log("Sever is runing...!");
});