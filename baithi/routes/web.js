const express = require('express');
const router = express.Router();

const Product = require('../models/Product');


router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ productStoreCode: -1 });
    res.render('index', { products });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error);
  }
});


router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).send();
    } else {
      res.redirect('/');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;