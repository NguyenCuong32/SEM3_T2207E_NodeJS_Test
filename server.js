const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = express();

//Set engine
app.set('view engine', 'ejs');

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_LOCAL)
        .then(()=>{
            console.log("Connection successful");
        })
        .catch((err)=>{
            console.log("Connection failed: ", err);
        })
        .finally(()=>{
            console.log("finally...");
        });

//Create Schema Object
var productSchema = new mongoose.Schema({
    ProductCode: String,
    ProductName: String,
    ProductDate: Date,
    ProductOriginPrice: Number,
    Quantity: Number,
    ProductStoreCode: String
});

//Get Schema Product
const Product = mongoose.model("Product", productSchema);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Add Product
app.post("/addProduct",()=>{
    const newProduct = new Product(req.body);
    newProduct
    .save()
    .then((doc)=>{
        console.log(doc);
        res.status(201).json({ message: "Create product successful", data: doc });
    })
    .catch((err)=>{
        console.log("Error create product", err);
        res.status(500).json({ message: "Create product failed"});
    });
});

//Get Products
app.get("/products",(req,res)=>{
    Product.find()
    .then((products)=>{
        res.status(200).json(products);
    })
    .catch((err)=>{
        console.log("Error fetching products", err);
        res.status(500).json({error: "Error get products"});
    });
    res.render('products', products);
});


//Delete Product
app.delete('/deleteProduct/:productCode',(req,res) =>{
    const productCode = req.params.productCode;
    User.findOneAndDelete({ProductCode: productCode})
    .then((deleteProduct) =>{
        if(!deleteProduct){
            return res.status(404).json({message: 'Product not found'});
        }
        res.json({message: 'Product deleted successfully', data:productCode});
    })
    .catch((err) => {
        console.error("Error: ", err);
        res.status(500).json({message: 'Unable to delete product'});
    });
});


// Handle route to render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

//Listening 
const port = 9000;
app.listen(port, "127.0.0.1", ()=>{
    console.log(`Listening on port ${port}`);
})