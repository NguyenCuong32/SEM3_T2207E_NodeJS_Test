const express = require('express');
const router = express.Router();

const Product = require('../models/Product');


router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
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
      res.send(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;