app.get('/api/products', (req, res) => {
  Product.find().sort({ ProductStoreCode: -1 }).exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(products);
    }
  });
});


app.get('/', (req, res) => {
  Product.find().sort({ ProductStoreCode: -1 }).exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('index', { products });
    }
  });
});