var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var ejs = require("ejs");
const { Decimal128 } = require('bson');

dotenv.config({ path: './config.env' });
var app  = express();
app.set("view engine","ejs");

mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => console.error("CF", err))
    .finally(() => {
        console.log("finally....")
    });

var productSchema = mongoose.Schema({
    ProductCode: {
        type: String,
        unique: true,
        },
    ProductName: {
        type: String,
        unique: true,
        },
    ProductData: Date,
    ProductOriginPrice:Decimal128,
    Quantity: Number,
    ProductStoreCode:String
});
const Product = mongoose.model("Product", productSchema);
app.use(express.json());

//insert product
app.post("/add", (req, res) => {
    const newProduct = new Product(req.body);
    newProduct
      .save()
      .then((doc) => {
        console.log(doc);
        res.status(201).json({ message: "Product created successfully", data: doc });
      })
      .catch((err) => {
        console.error("Error creating Product:", err);
        res.status(500).json({ error: "Unable to create Product" });
      });
});

//delete 
app.delete('/delete/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await User.findOneAndDelete({ productId: productId });
        res.status(200).send('Product deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
//get all
app.get("/", async (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    try {
        const products = await Product.find();
        res.render('listProduct.ejs', { products });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
  });

  app.listen(8087, () => {
    console.log("Port 8088")
})