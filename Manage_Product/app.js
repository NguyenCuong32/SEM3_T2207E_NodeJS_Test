const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Product = mongoose.model('Product', {
  productCode: String,
  productName: String,
  productData: String,
  productOriginPrice: Number,
  quantity: Number,
  productStoreCode: String,
  imageUrl: String
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Trang chính - Danh sách sản phẩm
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { products });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Trang thêm sản phẩm
app.get('/add', (req, res) => {
  res.render('add');
});

// Xử lý thêm sản phẩm
app.post('/add', upload.single('image'), async (req, res) => {
  const { productCode, productName, productData, productOriginPrice, quantity, productStoreCode} = req.body;
  const imageUrl = req.file ? req.file.filename : '';
  
  try {
    await Product.create({ productCode, productName, productData, productOriginPrice, quantity, productStoreCode, imageUrl });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Trang sửa sản phẩm
app.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('edit', { product });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Xử lý sửa sản phẩm
app.post('/edit/:id', upload.single('image'), async (req, res) => {
  const { productCode, productName, productData, productOriginPrice, quantity, productStoreCode } = req.body;
  const imageUrl = req.file ? req.file.filename : '';
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { productCode, productName, productData, productOriginPrice, quantity, productStoreCode, imageUrl },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Xóa sản phẩm
app.post('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
