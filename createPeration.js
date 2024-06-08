var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var table = document.getElementById('table');
var allProduct = [];
var mood = 'create';
var tmp;

// Local Storage
if (localStorage.getItem('allProducts') != null) {
  allProduct = JSON.parse(localStorage.getItem('allProducts'));
} else {
  allProduct = [];
}
showProduct();

// Create Function
function handleAdding() {
  var singlProduct = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };

  if (singlProduct.name !== '' && singlProduct.price !== '') {
    if (mood === 'create') {
      allProduct.push(singlProduct);
    } else {
      allProduct[tmp] = singlProduct;
      mood = 'create';
    }
    showProduct();
    clearInputs();
    localStorage.setItem('allProducts', JSON.stringify(allProduct));
  } else {
    alert('Something went wrong. Please fill in all required fields.');
  }
}

// Read Function
function showProduct() {
  var data = '';
  for (var i = 0; i < allProduct.length; i++) {
    data += `
      <tr>
        <td>${i + 1}</td>
        <td>${allProduct[i].name}</td>
        <td>${allProduct[i].price}</td>
        <td>${allProduct[i].desc}</td>
        <td>${allProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-info">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
      </tr>
    `;
  }
  table.innerHTML = data;
}

// Update Function
function updateProduct(index) {
  tmp = index;
  productName.value = allProduct[index].name;
  productPrice.value = allProduct[index].price;
  productCategory.value = allProduct[index].category;
  productDesc.value = allProduct[index].desc;
  mood = 'update';
}

// Delete Function
function deleteProduct(index) {
  allProduct.splice(index, 1);
  showProduct();
  localStorage.setItem('allProducts', JSON.stringify(allProduct));
}

// Clear Inputs Function
function clearInputs() {
  productName.value = '';
  productPrice.value = '';
  productCategory.value = '';
  productDesc.value = '';
}

// Search Function
function handleSearch(input) {
  var data = '';
  for (let i = 0; i < allProduct.length; i++) {
    if (allProduct[i].name.toLowerCase().includes(input.value.toLowerCase()) || allProduct[i].category.toLowerCase().includes(input.value.toLowerCase())) {
      data += `
        <tr>
          <td>${i + 1}</td>
          <td>${allProduct[i].name}</td>
          <td>${allProduct[i].price}</td>
          <td>${allProduct[i].desc}</td>
          <td>${allProduct[i].category}</td>
          <td><button onclick="updateProduct(${i})" class="btn btn-info">Update</button></td>
          <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
      `;
    }
  }
  table.innerHTML = data;
}
