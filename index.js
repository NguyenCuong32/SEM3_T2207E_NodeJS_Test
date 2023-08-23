const express = require ("express");
const ejs = require("ejs");
const app = express();
const port = 2010;
const path = require ("path");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
dotenv.config({path: "./configs/config.env"});
const bodyParser = require('body-parser');


mongoose.connect(process.env.DATABASE_LOCAL)
.then(()=>{
    console.log("connect ok");
    
})
.catch((err)=>{
    console.error("connection failed: ", err);
})
.finally(()=>{
    console.log("run...")
})

const publicDirectoryPath = path.join(__dirname,'./public')
app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

app.get('/', (req, res) =>{
    res.redirect("index.html")
    console.log('ok')
});



app.get('/createProduct', (req, res) =>{
    res.redirect("createProduct.html")
    console.log('ok')
});

var ProductSchema = mongoose.Schema({
    ProductName : String,
    ProductData: Date,
    POP: Number,
    PQ: Number,
    PC: String,
    PSC: String
});

const Product = mongoose.model('Product', ProductSchema);

app.post('/saveProduct', (req, res) => {
    const { ProductName, ProductData, POP, PQ, PC, PSC } = req.body;
    const createProduct = new Product({ ProductName, ProductData, POP, PQ, PC, PSC });

    createProduct.save()
        .then((doc) => {
            console.log(doc);
            res.redirect("index.html"); 
        })
        .catch((err) => {
            console.error("Unable to create Product", err);
            res.status(500).json({ message: "Unable to create Product" });
        });
});

////-------------------- lấy Products------------------
///
var getAllProduct = async function() {
    try {
      const Products = await Product.find({});
      return Products;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
///
var listProduct = async function(req, res) {
    try {
        const Products = await getAllProduct();
        res.render('ProductList', { Product: Products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
////////////////////////////////////////


//-------------------- xóa Product-----------------
var deleteProduct = async function(req, res) {
    try {
        const ProductId = req.params._id;
        await Product.findByIdAndDelete(ProductId);
        res.redirect('/ProductList'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

////////////////////////////////////////////////////
app.get("/ProductList", listProduct);
app.post('/deleteProduct/:_id', deleteProduct);