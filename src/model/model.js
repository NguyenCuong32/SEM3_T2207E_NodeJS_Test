const mongoose = require('mongoose');

const ProductSchema = new mongoose.schema({
    ProductCode: {
        type: String,
        require: true
    },
    ProductName:{
        type: String,
    },
    ProductData:{
        type: String
    },
    ProductOriginPrice: {
        type: String
    },
    Quantity: {
        type: String
    },
    ProductStoreCode: {
        type: String
    }
})