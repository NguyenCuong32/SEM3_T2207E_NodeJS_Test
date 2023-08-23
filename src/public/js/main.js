$(document).ready(function () {
  let method = 'post';
  let product = {};
  let urlAction;
  let sort = 'asc';
  $('tbody').on('click', '.btn-delete-product', function (e) {
    let that = $(this);
    e.preventDefault();
    let urlDelete = $(this).data('action');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#b02a37',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: urlDelete,
          success: function (response) {
            if (response.code == 200) {
              that.closest('tr').hide(300);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } else {
              Swal.fire('Error!', 'Delete failed.', 'error');
            }
          },
        });
      }
    });
  });

  $('#btnAddNewProduct').click(function (e) {
    e.preventDefault();
    myModal.show();
    urlAction = '/create';
    $('#modalHandleUserTitle').text('Add new user');
    method = 'post';
    $('#ProductCode').val('');
    $('#ProductName').val('');
    $('#ProductData').val('');
    $('#ProductOriginPrice').val('');
    $('#Quantity').val('');
    $('#ProductStoreCode').val('');
  });

  $('#handle-user').submit(function (e) {
    e.preventDefault();
    product.ProductCode = $('#ProductCode').val();
    product.ProductName = $('#ProductName').val();
    product.ProductData = $('#ProductData').val();
    product.ProductOriginPrice = $('#ProductOriginPrice').val();
    product.Quantity = $('#Quantity').val();
    product.ProductStoreCode = $('#ProductStoreCode').val();
    $.ajax({
      type: method,
      url: urlAction,
      data: product,
      success: function (response) {
        if (response.code == 200) {
          let product = response.data;
          let htmlString = `<tr>
																<td>${product._id.slice(-4)}</td>
																<td>${product.ProductCode}</td>
																<td>${product.ProductName}</td>
																<td>${product.ProductData}</td>
																<td>${product.ProductOriginPrice}</td>
																<td>${product.Quantity}</td>
																<td>${product.ProductStoreCode}</td>
																<td style="width: 200px">
																	<button data-action="/update/${product._id}" class="btn btn-success btn-edit-user" style="width: 80px">
																		Edit
																	</button>
																	<button data-action="/delete/${product._id}" class="btn btn-danger btn-delete-product" style="width: 80px">
																		Delete
																	</button>
																</td>
															</tr>`;
          $('#data-container').append(htmlString);
          myModal.hide();
          Swal.fire('Success!', 'User successfully created.', 'success');
        } else {
          Swal.fire('Error!', 'User creation failed.', 'success');
        }
      },
    });
  });

  var myModal = new bootstrap.Modal($('#modalHandleUser'), {
    keyboard: false,
  });

  $('#modalHandleUser').on('shown.bs.modal', function () {
    $(this).find('input').first().focus();
  });
});

function dateDisplay(dateObj) {
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  newdate = day + '/' + month + '/' + year;
}
