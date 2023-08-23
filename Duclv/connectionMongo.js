const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({path:"./config.env"});
var urlMongoose = process.env.DATABASE_LOCAL;

mongoose.connect(urlMongoose).then(()=>{
    console.log("Connect success.");
}).catch((ex)=>{
    console.log("Exception : "+ex.Message);
}).finally(()=>{
    console.log("finally . . .");
})



// schema

const schemaProduct = new mongoose.Schema({
    ProductCode : {
        type:String,
        required:[true,"ProductCode is required"],
        unique : true,
        },
        ProductName:String,
        ProductDate : Date,
        ProductOriginPrice : Number,
        Quantity : Number,
        ProductStoreCode : String,
})


const Product = mongoose.model("ProductCollection",schemaProduct);


module.exports = Product;