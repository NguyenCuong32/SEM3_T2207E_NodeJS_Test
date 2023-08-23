function displayData(){
    
    $.ajax({
        url: '/api/v1/Product', 
        method: 'GET', 
        dataType: 'json', 
        success: function(data) {
        
          var itemHtml = "";
          for (let i = 0; i < data.length; i++) {
            
             itemHtml += `<tr>
            <td>${i+1}</td>
            <td>${data[i].ProductCode}</td>
            <td>${data[i].ProductName}</td>
            <td>${data[i].ProductDate}</td>
            <td>${data[i].ProductOriginPrice}</td>
            <td>${data[i].Quantity}</td>
            <td>${data[i].ProductStoreCode}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteProduct('${data[i]._id}','${data[i].ProductCode}')">Xóa</button>
            </td>
          
          </tr>`;
          }


         
          $("#dataProduct").html(itemHtml);

        },
        error: function(data) {
          if(data.status == 200){
            var itemHtml = "";
            for (let i = 0; i < data.length; i++) {
              
               itemHtml += `<tr>
              <td>${i+1}</td>
              <td>${data[i].Productname}</td>
              <td>${data[i].fullName}</td>
              <td>${data[i].address}</td>
              <td>${data[i].age}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteProduct('${data[i]._id}','${data[i].Productname}')">Xóa</button>
              </td>
            
            </tr>`;
            }
            $("#dataProduct").html(itemHtml);
          }else{
           
            alert(data.responseText)
          }

        }
      });
}


displayData();



function deleteProduct(id,proCode){
  if(confirm("Bạn có chắc xóa sản phẩm"+proCode +" ?")){
    
    $.ajax({
      url: '/api/v1/Product/'+id, 
      method: 'DELETE', 
      dataType: 'json', 
      success: function(data) {
        if(xhr.status == 200){
          displayData();
          alert(data.responseText);
        }else{
         
          alert(xhr.responseText)
        }
      },
      error: function(xhr) {
        if(xhr.status == 200){
          displayData();
          alert(xhr.responseText);
        }else{
         
          alert(xhr.responseText)
        }

      }
    });
  }


}



function addNewProduct(){
  var request = {

    ProductCode : $("#ProductCode").val(),
    ProductName :$("#ProductName").val(),
    ProductOriginPrice: $("#ProductOriginPrice").val(),
    Quantity: $("#Quantity").val(),
    ProductStoreCode: $("#ProductStoreCode").val(),
}

$.ajax({
    url: '/api/v1/Product', 
    method: 'POST', 
    dataType: 'json', 
    data : request,
    success: function(data) {
      if(data.status == 200){
        displayData();
        alert(data.responseText);
      }else{
       
        alert(data.responseText)
      }
    },
    error: function(xhr) {
      if(xhr.status == 200){
        displayData();
        alert(xhr.responseText);
      }else{
       
        alert(xhr.responseText)
      }

    }
   
  });
}