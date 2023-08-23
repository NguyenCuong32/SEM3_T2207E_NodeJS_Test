const express = require("express");
var mongoose = require("mongoose");
const fs = require("fs");
var dotenv = require("dotenv");
const ejs = require('ejs');
const path = require('path');

dotenv.config({ path: "./config/config.env" });

var app = express();
app.use(express.static("public"));
app.use('/', express.static(path.join(__dirname, "node_modules/bootstrap/dist")))
app.use("/", express.static("node_modules/bootstrap/dist/"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


//---------Ketnoidatabase----------//
mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log("Connection succesful");
    })
    .catch((err) => { console.error("Connecttion fail", err) })
    .finally(() => {
        console.log("finally..");
    })

//---------Schema----------//
var ProductSchema = mongoose.Schema({
    ProductCode: String,
    ProductName: String,
    ProductData: String,
    ProductOriginPrice: String,
    Quantity: String,
    ProductStoreCode: String
});

const Prod = mongoose.model("Prod", ProductSchema);
app.use(express.json());

//--------------------------------------------------------------------------//

app.get("/", async (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*",
    });
    try {
        const prods = await Prod.find();
        res.render('Home.ejs', { prods });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

//--------------------------------------------------------------------------//


app.post("/post", (req, res) => {
    const newProd = new Prod(req.body);
    newProd.save()
        .then((doc) => {
            console.log(doc);
            res.status(201).json({ message: "Product created successful", data: doc })
        })
        .catch((err) => {
            console.error("Erro creating user", err);
            res.status(500).json({ error: "Unale to create product" })
        })
})

//--------------------------------------------------------------------------//

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Prod.findOneAndDelete({ _id: id });
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

});

app.listen(8088, () => {
    console.log("Port 8088")
})