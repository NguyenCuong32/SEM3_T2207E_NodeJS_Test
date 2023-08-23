function fetchProducts() {
    fetch('/products')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('productsTableBody');
        tableBody.innerHTML = '';
  
        data.forEach(product => {
          const row = document.createElement('tr');
          
          const productCode = document.createElement('td');
          productCode.textContent = product.productCode;
          row.appendChild(productCode);
  
          const productName = document.createElement('td');
          productName.textContent = product.productName;
          row.appendChild(productName);
  
          const productData = document.createElement('td');
          productData.textContent = product.productData;
          row.appendChild(productData);

          const productOriginPrice = document.createElement('td');
          productOriginPrice.textContent = product.productOriginPrice;
          row.appendChild(productOriginPrice);

          const quantity = document.createElement('td');
          quantity.textContent = product.quantity;
          row.appendChild(quantity);

          const productStoreCode = document.createElement('td');
          productData.textContent = product.productStoreCode;
          row.appendChild(productStoreCode);
  
          const removeButtonCell = document.createElement('td');
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.classList.add("btn", "btn-danger");
          removeButton.addEventListener('click', () => removeUser(product.productCode));
          removeButtonCell.appendChild(removeButton);
          row.appendChild(removeButtonCell);
          
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  }
//    // Function to remove a user
//    function removeUser(userId) {
//      fetch(`/remove-user/${userId}`, {
//        method: 'DELETE'
//      })
//        .then(response => response.json())
//        .then(data => {
//          console.log('User removed:', data);
//          fetchUsers();
//        })
//        .catch(error => console.error('Error removing user:', error));
//    }
//    // Initial fetch
   fetchProducts();
  
   // Submit form using AJAX
   $(document).ready(function () {
    $("#submit").click(function () {
       $.post("/add-product",
          {
            productCode : $("#productCode").val(),
            productName : $("#productName").val(),
            productData : $("#productData").val(),
            productOriginPrice : $("#productOriginPrice").val(),
            quantity : $("#quantity").val(),
            productStoreCode : $("#productStoreCode").val(),
          },
          function (data, status) {
             console.log(data);
          });
    });
  });
   