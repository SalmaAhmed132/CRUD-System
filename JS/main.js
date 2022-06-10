var productNameInp = document.getElementById('productName');
var productPriceInp = document.getElementById('productPrice');
var productCategoryInp = document.getElementById('producCategory');
var productDescInp = document.getElementById('productDesc');
var mainBtn = document.getElementById('mainBtn');
var nameAlert = document.getElementById('nameAlert')
var productsContainer;
var currentIndex = 0;


if (localStorage.getItem("products")==null)
{
    productsContainer=[];
} else {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts(productsContainer);
}



function addProduct(){

    var product = {
        name:productNameInp.value,
        price:productPriceInp.value,
        category:productCategoryInp.value,
        desc:productDescInp.value,
    }
    if (mainBtn.innerHTML=="Add Product")
     {
        productsContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        
        } 
     else 
        { 
            //update
        productsContainer[currentIndex].name=product.name;
        productsContainer[currentIndex].price=product.price;
        productsContainer[currentIndex].category=product.category;
        productsContainer[currentIndex].desc=product.desc;
        localStorage.setItem("products", JSON.stringify(productsContainer));
        window.location.reload()
    }
   
    displayProducts(productsContainer)
    clearForm()
}

function displayProducts(productsList){
    var tableRow=``;
    for (var i= 0; i < productsList.length; i++) {
         tableRow += ` <tr>
     <th>${i+1}</th>
     <td>${productsList[i].name}</td>
     <td>${productsList[i].price}</td>
     <td>${productsList[i].category}</td>
     <td>${productsList[i].desc}</td>
     <td><button onclick="updateProduct(${i})" class="btn btn-warning">Updtate</button></td>
     <td><button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
   </tr>`;
        
    }
  document.getElementById('Rows').innerHTML=tableRow;
}

function deleteProducts(productIndex){
    productsContainer.splice(productIndex,1);
    localStorage.setItem('products' ,JSON.stringify(productsContainer))
    displayProducts(productsContainer);
}

function clearForm(){
    productNameInp.value='';
    productPriceInp.value='';
    productCategoryInp.value='';
    productDescInp.value='';
}

    
function searchedProducts(term){
        var searchedProducts=[];
        for(i=0;i<productsContainer.length;i++)
        {
            if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())==true) {
                searchedProducts.push(productsContainer[i])
            } 
           displayProducts(searchedProducts)
        }
}

 function updateProduct(index)
    {
        currentIndex = index;
        var product = productsContainer[index]
        productNameInp.value =productsContainer[index].name
        productPriceInp.value =productsContainer[index].price
        productCategoryInp.value =productsContainer[index].category
        productDescInp.value =productsContainer[index].desc;
        mainBtn.innerHTML='Update Product'
}

 function validationName() 
{
    var regex = /^[A-Z][a-z]{2,8}$/;

    if (regex.test(productNameInp.value)) {
        mainBtn.removeAttribute("disabled")
        productNameInp.classList.add('is-valid')
        productNameInp.classList.remove('is-invalid')
        nameAlert.classList.add('d-none')

    } else {
        mainBtn.disabled="true"
        productNameInp.classList.add('is-invalid')
        productNameInp.classList.remove('is-valid')
        nameAlert.classList.remove('d-none')
    }
}



