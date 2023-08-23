const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
var Database = require('./database/database');
var routes = require('./routes/controller');


var app = express();

app.use(express.static(path.join(__dirname,"node_modules/bootstrap")))
app.use(express.static(path.join(__dirname,"images")))

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');  
app.set('views', './views');  
 
app.use('/', routes);   

app.listen(5000, () => {
    console.log("User Log in");
})
