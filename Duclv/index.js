const express = require("express");
const ejs = require("ejs");
const path = require('path');
const product = require("./ProductController");
const myApp = express();

// set config get data body client request
myApp.use(express.urlencoded({extended: true})); 
myApp.use(express.json());   

myApp.use(express.static(path.join(__dirname, 'js')));
//node_modules/javascript/callApi.js
//===================== view ===============
myApp.set("view engine" , "ejs")
myApp.get('/index', (req, res) => {
    res.render('index');
});

//====================== api ===============

myApp.post('/api/v1/Product',async (req , response)=>{
    try{
        var body = req.body;
        
        if(body.ProductCode == undefined || body.ProductCode == null || body.ProductCode.length == 0){
            return response.status(400).send("Vui lòng nhập username.")
        }
        if(body.ProductName == undefined || body.ProductName == null || body.ProductName.length == 0){
            return response.status(400).send("Vui lòng nhập họ và tên.")
        }
        console.log(body.ProductDate)
        var date = new Date(body.ProductDate);
        console.log(date);
        var data = {
            ProductCode : body.ProductCode,
            ProductName : body.ProductName,
            ProductDate : date,
            ProductOriginPrice: body.ProductOriginPrice,
            Quantity: body.Quantity,
            ProductStoreCode: body.ProductStoreCode,
        }
       
        var responseMessage =  await product.addProduct(data);
        
        return  response.status(responseMessage.status).send(responseMessage.message)
    }catch(ex){
        
        return  response.status(501).send("Đã xảy ra lỗi không mong muốn "+ex.message)
    }
})




myApp.get("/api/v1/Product",async (req,res)=>{
    try {
       

        let data = await product.getProduct();
       return res.status(200).send(data);
    } catch (error) {
       return res.status(501).send(error);
    }
})




myApp.delete("/api/v1/Product/:id",async(req,res)=>{

    try {
        if(req.params.id == undefined || req.params.id == null || req.params.id.length == 0){
           return res.status(400).send("vui lòng chọn sản phẩm cần xóa.")
        }else{
          let response = await product.deleteProduct(req.params.id)
           return res.status(response.status).send(response.message)
        }
        
    } catch (error) {
       return res.status(501).send("Đã xảy ra lỗi không mong muốn : "+error.message)
    }
})



myApp.put("/api/v1/Product/:ProductCode",async(req,res)=>{
   
    try {

        var body = req.body;
            if(req.params.ProductCode == undefined || req.params.ProductCode == null || req.params.ProductCode.length == 0){
                return  res.status(400).send("Vui lòng chọn sản phẩm cần sửa.")
            }
            if(body.ProductName == undefined || body.ProductName == null || body.ProductName.length == 0){
                return res.status(400).send("Vui lòng nhập họ và tên.")
            }
            var dataRespon = await product.updateProduct(req.params.ProductCode,body);
                return res.status(dataRespon.status).send(dataRespon.message)
    } catch (error) {
        return res.status(501).send("Đã xảy ra lỗi không mong muốn: "+error.message)
    }
    
});




myApp.listen(80 ,"127.0.0.10",()=>{
console.log("127.0.0.10");
})
