const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: String,
  productName: String,
  productDate: Date,
  productOrigin: String,
  productPrice: Number,
  productQuantity: Number,
  productStoreCode: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;