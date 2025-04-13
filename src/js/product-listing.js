document.addEventListener("DOMContentLoaded", function () {  
    fetch("https://fakestoreapi.com/products")  
        .then((response) => response.json())  
        .then((products) => {  
            const productList = document.getElementById("product-list");  
            const sortOptions = document.getElementById("sort-options");  
        
            // Function to render products  
            function renderProducts(productsToRender) {  
                productList.innerHTML = ""; // Clear existing products  
                productsToRender.forEach((product) => {  
                    const discountPercentage = Math.floor(Math.random() * 16) + 5;  
                    const discountedPrice = (product.price * (1 - discountPercentage / 100)).toFixed(2);  
                
                    const productItem = document.createElement("div");  
                    productItem.classList.add("product-item");  
                    productItem.innerHTML = `  
                        <span class="discount-badge">${discountPercentage}% OFF</span>  
                        <img src="${product.image}" alt="${product.title}" width="100">  
                        <h3>${product.title}</h3>  
                        <p><del>$${product.price}</del> <strong>$${discountedPrice}</strong></p>  
                        <button class="like-button" data-id="${product.id}">🤍</button>  
                        <button class="quick-view" data-id="${product.id}" data-name="${product.title}" data-image="${product.image}" data-description="${product.description}" data-price="${discountedPrice}">Quick View</button>  
                        <button class="add-to-cart" data-id="${product.id}" data-name="${product.title}" data-price="${discountedPrice}" data-image="${product.image}">Add to Cart</button>  
                    `;  
                    productList.appendChild(productItem);  
                });  
              
                updateLikeButtons();  
                updateAddToCartButtons();  
                setupQuickViewButtons();  
                updateCartCount();  
            }    
          
            // Initial render of products  
            renderProducts(products); 
          
            // Sorting functionality  
            sortOptions.addEventListener("change", function () {  
                const sortingOption = this.value;  
            
                // Sort products based on the selected sorting option  
                let sortedProducts = [...products]; // Shallow copy of the products array  
            
                if (sortingOption === 'name-asc') {  
                    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));  
                } else if (sortingOption === 'name-desc') {  
                    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));  
                } else if (sortingOption === 'price-asc') {  
                    sortedProducts.sort((a, b) => a.price - b.price);  
                } else if (sortingOption === 'price-desc') {  
                    sortedProducts.sort((a, b) => b.price - a.price);  
                }  
              
                // Render the sorted products  
                renderProducts(sortedProducts);  
            });  
        });  
});  

// Quick View modal functionality  
function setupQuickViewButtons() {  
  const quickViewButtons = document.querySelectorAll(".quick-view");  
  const quickViewModal = document.getElementById("quick-view-modal");  
  const modalContent = document.getElementById("modal-content");  

  quickViewButtons.forEach((button) => {  
      button.addEventListener("click", () => {  
          const productData = button.dataset;  
          modalContent.innerHTML = `  
              <span id="close-modal" class="modal-close">&times;</span>  
              <h2>${productData.name}</h2>  
              <img src="${productData.image}" alt="${productData.name}" width="200">  
              <p>${productData.description}</p>  
              <p>Price: <strong>$${productData.price}</strong></p>  
          `;  
          quickViewModal.style.display = "flex";  
      });  
  });  

  // Close Quick View modal when close button is clicked  
  quickViewModal.addEventListener("click", (event) => {  
      if (event.target.id === "close-modal" || event.target === quickViewModal) {  
          quickViewModal.style.display = "none";  
      }  
  });  
}  

function updateLikeButtons() {  
  const likeButtons = document.querySelectorAll(".like-button");  

  // Load wishlist from local storage to preserve state on page load  
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  likeButtons.forEach((button) => {  
    const productId = button.dataset.id;  

    // Check if product is already in the wishlist  
    const isLiked = wishlist.some((item) => item.id === productId);  
    if (isLiked) {  
        button.classList.add("liked");  
        button.textContent = "❤️";  
    }  
    
    // Add event listener for the like button  
    button.addEventListener("click", () => {  
        const productInfo = {  
            id: productId,  
            name: button.parentElement.querySelector("h3").innerText,  
            price: button.parentElement.querySelector("strong").innerText,  
            image: button.dataset.image,  
        };  
        const existingProductIndex = wishlist.findIndex(  
            (item) => item.id === productId,  
        );  
        if (existingProductIndex === -1) {  
            wishlist.push(productInfo);  
            button.classList.add("liked");  
            button.textContent = "❤️";  
            alert("Added to wishlist!");  
        } else {  
            wishlist.splice(existingProductIndex, 1); // Remove from wishlist  
            button.classList.remove("liked");  
            button.textContent = "🤍";  
            alert("Removed from wishlist!");  
        }  
        localStorage.setItem("wishlist", JSON.stringify(wishlist));  
    });  
  });  
}  

// Add to Cart Functionality  
function addToCart(product) {  
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];  
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);  

    if (existingProductIndex !== -1) {  
        // Item already exists in the cart, increment the quantity  
        cartItems[existingProductIndex].quantity += 1; // Increment quantity  
    } else {  
        // Item does not exist, add it to the cart with quantity set to 1  
        product.quantity = 1; // Initialize quantity  
        cartItems.push(product);  
    }  

    // Save updated cart back to local storage  
    localStorage.setItem("cart", JSON.stringify(cartItems));  
}  

// Update Add to Cart Buttons  
function updateAddToCartButtons() {  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');  

    addToCartButtons.forEach(button => {  
        button.addEventListener('click', () => {  
            const productId = button.dataset.id;  
            const productInfo = {   
                id: productId,   
                name: button.dataset.name,   
                price: parseFloat(button.dataset.price), // Ensure price is a number  
                image: button.dataset.image   
            };  
            
            addToCart(productInfo); // Call the addToCart function with the product info  
            alert("Added to cart!"); // Notify the user  
            updateCartCount(); // Update the cart count after adding  
        });  
    });  
}     

function updateCartCount() {  
    const cartCountElement = document.getElementById("cart-count");  
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from local storage  
    // Calculate total quantity of items in the cart  
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);  
    cartCountElement.innerText = totalCount; // Update the count with total quantity  
    // Optional: Add animation style or update the UI based on the count  
    if (totalCount > 0) {  
        cartCountElement.classList.add("has-items"); // Add class if there are items  
    } else {  
        cartCountElement.classList.remove("has-items"); // Remove class if empty  
    }  
}  

// Search functionality
const urlParams = new URLSearchParams(window.location.search);  
const searchQuery = urlParams.get('query');  

if (searchQuery) {  
    fetch(`https://fakestoreapi.com/products`)  
        .then(response => response.json())  
        .then(products => {  
          // Filter products based on the search query  
          const filteredProducts = products.filter(product =>  
            product.title.toLowerCase().includes(searchQuery.toLowerCase())  
          );  
        
          renderProducts(filteredProducts);  
        })  
        .catch(error => console.error("Error fetching products:", error));  
}  

function renderProducts(products) {  
    const productList = document.getElementById("product-list");  
    productList.innerHTML = ""; // Clear existing products  

    if (products.length === 0) {  
        productList.innerHTML = "<p>No products found.</p>";  
        return;  
    }  

    products.forEach(product => {  
        const productItem = document.createElement("div");  
        productItem.classList.add("product-item");  
        productItem.innerHTML = `  
          <img src="${product.image}" alt="${product.title}" width="100">  
          <h3>${product.title}</h3>  
          <p>Price: $${product.price}</p>  
        `;  
        productList.appendChild(productItem);  
    });  
} 