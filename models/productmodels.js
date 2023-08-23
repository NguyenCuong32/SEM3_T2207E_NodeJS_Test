const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
 

var ProductCollectionSchema =  Schema({
     
    ProductCode: {
        type: String,
        unique:true
      },
      ProductName: {
        type: String
    },
    ProductOriginPrice: {
        type: Number
    },
    Quantity:{
        type: Number
    },
    ProductStoreCode: {
        type:String
    }
    ,
    ProductData: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('productcolls', ProductCollectionSchema);

 