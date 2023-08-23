const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  ProductCode: {
    type: String,
    // required: true,
  },
  ProductName: {
    type: String,
    // required: true,
  },
  ProductData: {
    type: String,
    // required: true,
  },
  ProductOriginPrice: {
    type: Number,
    // required: true,
  },
  Quantity: {
    type: Number,
    // required: true,
  },
  ProductStoreCode: {
    type: String,
    // required: true,
  },
});
module.exports = mongoose.model("products", productSchema);
