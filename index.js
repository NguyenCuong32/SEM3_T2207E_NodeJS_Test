const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/productdb', { useNewUrlParser: true, useUnifiedTopology: true });


const productSchema = new mongoose.Schema({
  ProductCode: String,
  ProductName: String,
  ProductDate: Date,
  ProductOriginPrice: Number,
  Quantity: Number,
  ProductStoreCode: String
});

const Product = mongoose.model('Product', productSchema);


app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete('/api/products/:productId', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



