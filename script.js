let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')
let dropdownIsOpen = false

if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`)

      if (target) {
        if (target.classList.contains('show')) {
          target.classList.remove('show')
          dropdownIsOpen = false
        } else {
          target.classList.add('show')
          dropdownIsOpen = true
        }
      }
    })
  })
}

window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
      let targetIsDropdown = dropdown == event.target

      if (dropdownButton == event.target) {
        return
      }

      if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
        dropdown.classList.remove('show')
      }
    })
  }
})
function handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
      let navbarMenu = document.querySelector('.navbar-menu')

      if (!navbarMenu.classList.contains('active')) {
        navbarMenu.classList.add('active')
      } else {
        navbarMenu.classList.remove('active')
      }
    })
}

handleSmallScreens()

const apiURL = 'https://fakestoreapi.com/products'; 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsContainer = document.getElementById('products');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error');

async function fetchProducts() {
    try {
        
        loader.style.display = 'block';
        errorMessage.style.display = 'none';

        
        const response = await fetch(apiURL);

        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

    
        const products = await response.json();

        
        loader.style.display = 'none';

        
        displayProducts(products);
    } catch (error) {
        
        loader.style.display = 'none';
        errorMessage.style.display = 'block';
        console.error('Error:', error.message);
    }
}


function displayProducts(products) {
    productsContainer.innerHTML = '';

    products.forEach(product => {
      
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
       
        productsContainer.appendChild(productCard);
    });
}

fetchProducts();
function addToCart(id, title, price) {
  const product = { id, title, price };

  if (!cart.some(item => item.id === id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
  } else {
      alert('Product already in cart!');
  }
}


function displayCart() {
  const cartSection = document.getElementById('cart-section');
  cartSection.innerHTML = '<h3>Your Cart:</h3>';

  cart.forEach((item, index,product) => {
      cartSection.innerHTML += `<p>${index + 1}. ${item.title} - $${item.price}</p>`;
  });
}


window.onload = function () {
  fetchProducts();
  displayCart();
};

