const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ ProductStoreCode: -1 });
    res.render('product-list', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
