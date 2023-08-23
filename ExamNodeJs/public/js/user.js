const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017'; // Change the MongoDB connection URL if needed

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db('your-database-name'); // Replace 'your-database-name' with your actual database name
  const collection = db.collection('ProductCollection'); // Replace 'ProductCollection' with your actual collection name

  // REST API - Insert a new product
  app.post('/api/products', (req, res) => {
    const product = req.body;

    collection.insertOne(product, (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(201);
    });
  });

  // REST API - Delete a product by ID
  app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    collection.deleteOne({ _id: mongodb.ObjectID(productId) }, (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });

  // Website - Get all products and display them
  app.get('/', (req, res) => {
    collection.find().toArray((err, products) => {
      if (err) {
        console.error('Error retrieving products:', err);
        products = [];
      }

      res.render('index', { products });
    });
  });

  // Website - Insert a new product
  app.post('/products', (req, res) => {
    const product = req.body;

    collection.insertOne(product, (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        res.redirect('/');
        return;
      }

      res.redirect('/');
    });
  });

  // Website - Delete a product by ID
  app.post('/products/delete/:id', (req, res) => {
    const productId = req.params.id;

    collection.deleteOne({ _id: mongodb.ObjectID(productId) }, (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
      }

      res.redirect('/');
    });
  });

  // Website - Sort products by ProductStoreCode in descending order
  app.get('/products/sort', (req, res) => {
    collection.find().sort({ ProductStoreCode: -1 }).toArray((err, products) => {
      if (err) {
        console.error('Error retrieving sorted products:', err);
        products = [];
      }

      res.render('index', { products });
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});