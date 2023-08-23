const express = require('express');
const path = require('path');
const app = express();
const webRouter = require('./routes/web');
const connect = require('./config/connnect');
const fs = require('fs');
const config = require('./config/config');
const removeVietnameseTones = require('./utility/utility');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Config and connect
config(app);
connect();

//API
app.use('/', webRouter);

app.listen(port, function () {
  console.log('%s\x1b[32m\x1b[1m%s\x1b[0m', 'App is listening at ', `http://localhost:${port}`);
});
