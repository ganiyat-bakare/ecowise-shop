document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");

      products.forEach((product) => {
        const discountPercentage = Math.floor(Math.random() * 16) + 5;
        const discountedPrice = (
          product.price *
          (1 - discountPercentage / 100)
        ).toFixed(2);

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

  // Close modal when clicking outside of it
  quickViewModal.addEventListener("click", (event) => {
    if (event.target === quickViewModal) {
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
        wishlist.splice(existingProductIndex, 1);
        button.classList.remove("liked");
        button.textContent = "🤍";
        alert("Removed from wishlist!");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });
}

// function updateAddToCartButtons() {
//   const addToCartButtons = document.querySelectorAll('.add-to-cart');

//   addToCartButtons.forEach(button => {
//       button.addEventListener('click', () => {
//           const productId = button.dataset.id;
//           const cart = JSON.parse(localStorage.getItem('cart')) || [];

//           // Get the product information from the button's parent element
//           const productInfo = {
//               id: productId,
//               name: button.parentElement.querySelector('h3').innerText,
//               price: button.parentElement.querySelector('strong').innerText,
//               image: button.dataset.image // Capture the product image
//           };

//           // Check if the product is already in the cart
//           const existingProductIndex = cart.findIndex(item => item.id === productId);

//           if (existingProductIndex === -1) {
//               cart.push(productInfo); // Add the product to the cart if it is not already there
//           } else {
//               alert("This item is already in your cart!"); // Alert user if the item is already in the cart
//           }

//           localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to local storage
//       });
//   });
// }

function updateAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Get the product information from the button's parent element
      const productInfo = {
        id: productId,
        name: button.parentElement.querySelector("h3").innerText,
        price: button.parentElement.querySelector("strong").innerText,
        image: button.dataset.image,
      };

      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId,
      );

      if (existingProductIndex === -1) {
        cart.push(productInfo);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      } else {
        alert("This item is already in your cart!");
      }
    });
  });
}

// function updateCartCount() {
//   const cartCountElement = document.getElementById('cart-count');
//   let currentCount = parseInt(cartCountElement.innerText);

//   // Increment the count (this could be smarter if tracking unique items)
//   currentCount += 1;
//   cartCountElement.innerText = currentCount;

//   // Add animation class temporarily
//   cartCountElement.classList.add('animated');

//   // Remove class after animation is done to reset
//   setTimeout(() => {
//       cartCountElement.classList.remove('animated');
//   }, 500); // Duration of the shake effect
// }

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from local storage

  // Set the cart count based on the number of items in the cart
  cartCountElement.innerText = cart.length; // Update the count in the cart-count element

  // Optional: You may want to add animation style or update the UI based on the count
  if (cart.length > 0) {
    cartCountElement.classList.add("has-items"); // Add class if there are items
  } else {
    cartCountElement.classList.remove("has-items"); // Remove class if empty
  }
}
