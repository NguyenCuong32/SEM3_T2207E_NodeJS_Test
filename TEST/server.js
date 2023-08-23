var express = require('express');
var ejs = require("ejs");
var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

var app = express();

app.set("view engine","ejs");

mongoose.connect(process.env.DATABASE_LOCAL)
        .then(() => {
            console.log("Connection successful");
        })
        .catch((err) => console.error("Create false", err))
        .finally(() => {
            console.log("finally....")
        });

var prodcutSchema = mongoose.Schema({
    ProductCode: String,
    ProductName: String,
    ProductData: String,
    ProductOriginPrice: Number,
    Quantity: Number,
    ProductStoreCode: String
});

const Product = mongoose.model("Product", prodcutSchema);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    console.log("Create....");
    const newProduct = new Product(req.body);
    newProduct
        .save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({message: "Product create successful", data: doc});
        })
        .catch((err) => {
            console.error("Error create", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.get("/", (req, res) => {
    Product.find({})
        .then((products) => {
            res.status(201).json(products);
        })
        .catch((err) => {
            console.error("Error fetching", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.delete("/:ProductCode", (req, res) => {
    const ProductCode = req.params.ProductCode;
    Product.findOneAndDelete({ ProductCode: ProductCode})
        .then((deletedProduct) => {
            if (deletedProduct) {
                res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
            } 
            else {
                res.status(404).json({ error: "Product not found" });
            }
        })
        .catch((err) => {
            console.error("Error delete", err);
            res.status(500).json({ error: "Unable"});
        });

});

app.get("/product", (req, res) => {
    Product.find({})
        .then((products) => {
            console.log(products);
            var P = {
                product: products,
            }
            console.log(P);
            res.render('product', P);
        })
        .catch((err) => {
            console.error("Error fetching", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.post("/product/add", (req, res) => {
    console.log("Create....");
    const newProduct = new Product({
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductData: req.body.ProductData,
        ProductOriginPrice: req.body.ProductOriginPrice,
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode
    });

    newProduct
        .save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({message: "Product create successful", data: doc});
        })
        .catch((err) => {
            console.error("Error create", err);
            res.status(500).json({ error: "Unable"});
        });
});

app.delete("/product/del/:ProductCode", (req, res) => {
    console.log("Delete....");
    console.log(req.params.ProductCode);
    const ProductCode = req.params.ProductCode;

    Product.findOneAndDelete({ ProductCode: ProductCode })
        .then((deletedProduct) => {
            if (deletedProduct) {
                res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
            } else {
                res.status(404).json({ error: "Product not found" });
            }
        })
        .catch((err) => {
            console.error("Error deleting product", err);
            res.status(500).json({ error: "Unable to delete product" });
        });
});


app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});