// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/product-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Product schema
const productSchema = new mongoose.Schema({
  ProductCode: String,
  ProductName: String,
  ProductData: Date,
  ProductOriginPrice: Number,
  Quantity: Number,
  ProductStoreCode: String,
});

const Product = mongoose.model('Product', productSchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint for inserting a new product
app.post('/api/products', (req, res) => {
  const {
    ProductCode,
    ProductName,
    ProductData,
    ProductOriginPrice,
    Quantity,
    ProductStoreCode,
  } = req.body;

  const newProduct = new Product({
    ProductCode,
    ProductName,
    ProductData,
    ProductOriginPrice,
    Quantity,
    ProductStoreCode,
  });

  newProduct.save((err, product) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(product);
    }
  });
});

//