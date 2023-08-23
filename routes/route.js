const express = require("express");
const router = express.Router();
const sanpham = require("../model/model");

router.get("/", async function (req, res) {
  try {
    let products = await sanpham.find({});
    // res.json(users);
    res.render("index", { products });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/add", function (req, res) {
  res.render("add");
});

router.post("/add", async function (req, res) {
  let product = req.body;
  try {
    let newProduct = new sanpham({
      ProductCode: product.ProductCode,
      ProductName: product.ProductName,
      ProductData: product.ProductData,
      ProductOriginPrice: product.ProductOriginPrice,
      Quantity: product.Quantity,
      ProductStoreCode: product.ProductStoreCode,
    });
    await newProduct.save();
    res.redirect("/");
    // res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/delete/:id", async function (req, res) {
  try {
    let id = req.params.id;
    await sanpham.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
