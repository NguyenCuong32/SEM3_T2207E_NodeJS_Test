function fetchUsers() {
    fetch('/users')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = '';
  
        data.forEach(user => {
          const row = document.createElement('tr');
          
          const usernameCell = document.createElement('td');
          usernameCell.textContent = user.username;
          row.appendChild(usernameCell);
  
          const fullnameCell = document.createElement('td');
          fullnameCell.textContent = user.fullname;
          row.appendChild(fullnameCell);
  
          const addressCell = document.createElement('td');
          addressCell.textContent = user.address;
          row.appendChild(addressCell);
  
          const removeButtonCell = document.createElement('td');
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.classList.add("btn", "btn-danger");
          removeButton.addEventListener('click', () => removeUser(user._id));
          removeButtonCell.appendChild(removeButton);
          row.appendChild(removeButtonCell);
          
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  }
   // Function to remove a user
   function removeUser(userId) {
     fetch(`/remove-user/${userId}`, {
       method: 'DELETE'
     })
       .then(response => response.json())
       .then(data => {
         console.log('User removed:', data);
         fetchUsers();
       })
       .catch(error => console.error('Error removing user:', error));
   }
   // Initial fetch
   fetchUsers();
  
   // Submit form using AJAX
   $(document).ready(function () {
    $("#submit").click(function () {
       $.post("/add-user",
          {
             username : $("#username").val(),
             fullname : $("#fullname").val(),
             address : $("#address").val()
          },
          function (data, status) {
             console.log(data);
          });
    });
  });
   