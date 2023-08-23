app.get('/', async (req, res) => {
    try {
      const products = await Product.find().sort({ ProductStoreCode: -1 });
      res.render('index.ejs', { products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });