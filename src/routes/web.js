const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async function (req, res) {
  try {
    let products = await Product.find({});
    res.render('index', { products: products });
  } catch (error) {
    res.json(error);
  }
});

router.post('/create', async function (req, res) {
  let product = req.body;
  try {
    product = await Product.create(product);
    res.json({ code: 200, message: 'success', data: product });
  } catch (error) {
    res.json({ code: 500, message: 'error' });
  }
});

router.get('/delete/:id', async function (req, res) {
  let id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.json({ code: 200, message: 'success' });
});

router.get('/sort/:value', async function (req, res) {
  let value = req.params.value;
  try {
    let products = await Product.find({}).sort({ ProductStoreCode: value });
    res.render('index', { products: products });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
