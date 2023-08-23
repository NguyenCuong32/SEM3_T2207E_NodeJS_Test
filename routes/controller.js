var express = require('express');
var router = express.Router();
var Product = require('./../database/models/productmodels');
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    Product.find({})
        .then(productcolls => {
            res.render('home', { productcolls: productcolls })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});
router.get('/addpro', (req, res) => {
    res.render('addpro');
});

router.post('/', (req, res) => {
    try {
     let newProduct = new Product({
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductOriginPrice: req.body.ProductOriginPrice,
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode,
         ProductData: req.body.ProductData
     });
       

    newProduct.save()
    .then(doc => {
         res.redirect('/');
    })
    .catch(err => {
        console.log('Error: ', err);
        throw err;
    })
} catch (error) {
 console.log(error);
}

});
router.delete('/:ProductCode', (req, res) => {
    let productId = req.params.ProductCode;
    Product.findByIdAndDelete(productId)
       .then((productcolls) => {
        res.render('home', { productcolls: productcolls });
   })
    .catch((err) =>{
        console.log(err);
    })
    
});
router.get('/detail/:productcode', (req, res) => {
    Product.find( {ProductCode:req.params.userid})
        .then((productcolls) => {
        res.render('detail', { productcolls: productcolls});
    })
    .catch((err) =>{
        console.log(err);
    })
    
});