var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const uniqueValidator = require('mongoose-unique-validator');
const path = require('path');

dotenv.config({ path: "./config.env"});

var app = express();

mongoose.connect(process.env.DATABASE_LOCAL)
                .then(() => {
                    console.log("Connect successfull");
                })
                .catch((err) => console.error("Connect failed:",err))
                .finally(() => {
                    console.log("Finally...");
})


var productSchema = mongoose.Schema({
                    productCode: { type: String, unique: true },
                    productName: String,
                    productData: Date,
                    productOriginPrice: Number,
                    quantity: Number,
                    productStoreCode: String
});

productSchema.plugin(uniqueValidator, { message: '{VALUE} already exists.' });
                
const Product = mongoose.model("Product", productSchema);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false  }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/products', async (req, res) => {
    try {
      const product = await Product.find();
      res.json(product);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

app.post('/add-product', async (req, res) => {
  const { productCode, productName, productData, productOriginPrice, quantity, productStoreCode } = req.body;

  try {

    
    const newProduct = new Product({
      productCode,
      productName,
      productData,
      productOriginPrice,
      quantity,
      productStoreCode,
    });

    await newProduct.save();
    console.log('Product inserted:', newProduct);
    res.json({ message: 'Product inserted successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Validation Error:', err.errors);
      res.status(400).json({ error: 'Validation error', details: err.errors });
    } else {
      console.error('Error inserting Product:', err);
      res.status(500).json({ error: 'Error inserting Product' });
    }
  }
});

app.delete('/remove-product/:id', async (req, res) => {
    const productCode = req.params.id;
  
    try {
      await Product.findByIdAndRemove(productCode);
      res.json({ message: 'Product removed successfully' });
    } catch (err) {
      console.error('Error removing product:', err);
      res.status(500).json({ error: 'Error removing product' });
    }
});


app.listen(9000,"127.0.0.1",()=>{
    console.log("Listening to request on port 9000");
});