const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  ProductCode: String,
  ProductName: String,
  ProductData: String,
  ProductOriginPrice: Number,
  Quantity: Number,
  ProductStoreCode: String,
});

module.exports = mongoose.model('Product', product);
