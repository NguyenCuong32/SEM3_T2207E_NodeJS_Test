const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async(req, res)=>{
        try {
         const newProduct = await Product.find();       
         res.render('index',{newProduct});
        } catch (error) {
            res.status(500).send('error');    
        }   
});

router.post('/add', async (req, res)=>{
    try {
        const productNew = new Product({
            ProductName: req.body.name ,
            ProductData:req.body.productData,
            ProductOriginPrice : req.body.price,
            Quantity: req.body.quantity,
            ProductStoreCode: req.body.storeCode
        });  
        await productNew.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Loi server')
    }
});

router.get('/add', async(req, res)=>{
    res.render('add_product')
});

router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Loi server');
    }
});

module.exports = router