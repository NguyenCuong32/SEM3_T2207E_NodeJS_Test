


const { response } = require("express");
const model = require("./connectionMongo");




//async function getProduct(ProductCode,ProductName,ProductDate,ProductOriginPrice,Quantity,ProductStoreCode){
    async function getProduct(){

    try {
        
       
        
        return findProduct = await model.find().sort({ProductStoreCode : -1}).then((res)=>{
            return res
        }).catch((err)=>{
            return [];
        })
    } catch (error) {
        throw error
    }
   
}







async function addProduct(data) {
    try {
        console.log(data);
      var findProduct = await model.findOne({ProductCode : data.ProductCode}).then((res) => {
            return res;
          }).catch((err) => {
            return null;
          });

    if(findProduct == null || findProduct.length == 0)
    {
        var addModel = new model({
            ProductCode : data.ProductCode,
            ProductName : data.ProductName,
            ProductDate : new Date(),
            ProductOriginPrice: data.ProductOriginPrice,
            Quantity: data.Quantity,
            ProductStoreCode: data.ProductStoreCode,
        })

        await addModel.save();
        var responseMessage = {
            message : "Thêm thành công.",
            status : 200
        };
        return responseMessage;
    }else{
       
        var responseMessage = {
            message : "Mã sản phẩm "+findProduct.ProductCode +" đã tồn tại.",
            status : 409
        };
        return responseMessage
    }
    } catch (error) {
        var responseMessage = {
            message : "Đã xảy ra lỗi không mong muốn : "+error.message,
            status : 501
        };
        return responseMessage; 
    }
}





async function deleteProduct(id){
    try {
        return model.findByIdAndDelete(id).then((succ)=>{
            if(succ == null){
                var data = {
                    message: "Sản phẩm không tồn tại.",
                    status : 400
                }
                return data;
            }else{
                var data = {
                    message: "Xóa thành công sản phẩm."+succ.ProductCode,
                    status : 200
                }
                return data
            }
        }).catch((err)=>{
            var data = {
                message: "Đã xảy ra lỗi không mong muốn: "+err.message,
                status : 501
            }
            return data
        })
    } catch (error) {
        var data = {
            message: "Đã xảy ra lỗi không mong muốn: "+error.message,
            status : 501
        }
        return data
    }
}




async function updateProduct(ProductCode , dataUpdate){
    const filter = { ProductCode: ProductCode }; // Điều kiện tìm kiếm
    
    if (dataUpdate.hasOwnProperty("ProductCode")){
        delete dataUpdate.ProductCode;
    }

   return model.findOneAndUpdate(filter, dataUpdate)
    .then((res) => {
        if(res == null){
           var dataRespon = {
                status : 404,
                message : "Không tìm thấy sản phẩm "+ProductCode,
            }
            return dataRespon
        }else{
            var dataRespon = {
                status : 200,
                message : "cập nhật thành công sản phẩm "+res.ProductCode,
            }
            return dataRespon
        }
        
    })
    .catch(error => {
        dataRespon = {
            status : 501,
            message : "Đã xảy ra lỗi ngoài ý muốn: "+error.message,
        }
        return dataRespon
    });
}






module.exports = {
    addProduct : addProduct,
    getProduct : getProduct,
    updateProduct : updateProduct,
    deleteProduct : deleteProduct,
}

