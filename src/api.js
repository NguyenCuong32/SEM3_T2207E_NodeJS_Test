const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


const productRoutes = require('./routes/product');
app.use('/products', productRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
