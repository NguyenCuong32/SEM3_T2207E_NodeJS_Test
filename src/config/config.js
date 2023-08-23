const path = require('path');
const express = require('express');

function config(app) {
  app.set('views', 'views');
  app.set('view engine', 'ejs');
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = config;
