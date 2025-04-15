document.addEventListener("DOMContentLoaded", async function () {
  const productList = document.getElementById("product-list");
  const sortOptions = document.getElementById("sort-options");

  // Function to fetch products
  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const products = await response.json();
      renderProducts(products);
      return products; // Return products for sorting and searching later
    } catch (error) {
      console.error("Error fetching products:", error);
      productList.innerHTML =
        "<p>Failed to load products. Please try again later.</p>"; // Show an error message to the user
    }
  }

  // Function to render products
  function renderProducts(productsToRender) {
    productList.innerHTML = ""; // Clear existing products

    if (productsToRender.length === 0) {
      productList.innerHTML = "<p>No products found.</p>";
      return;
    }

    productsToRender.forEach((product) => {
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
  }

  // Fetch and render products on page load
  const products = await fetchProducts();

  // Sorting functionality
  sortOptions.addEventListener("change", function () {
    const sortingOption = this.value;

    let sortedProducts = [...products]; // Shallow copy of the products array

    if (sortingOption === "name-asc") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "name-desc") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortingOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Render the sorted products
    renderProducts(sortedProducts);
  });

  // Search functionality
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");

  if (searchQuery) {
    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    renderProducts(filteredProducts);
  }
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

  // Close Quick View modal when the close button is clicked
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

    // Check if the product is already in the wishlist
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
  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === product.id,
  );

  if (existingProductIndex !== -1) {
    // Item already exists in the cart, increment the quantity
    cartItems[existingProductIndex].quantity += 1; // Increment quantity
  } else {
    // Item does not exist, add it to the cart with quantity set to 1
    product.quantity = 1; // Ensure quantity is properly initialized
    cartItems.push(product);
  }

  // Save updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Update Add to Cart Buttons
function updateAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      const productInfo = {
        id: productId,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price), // Ensure price is a number
        image: button.dataset.image,
      };

      addToCart(productInfo); // Call the addToCart function with the product info
      alert("Added to cart!"); // Notify the user
      updateCartCount(); // Update the cart count after adding

      // Animate cart icon
      const cartIcon = document.querySelector(".cart-icon");
      cartIcon.classList.add("animated");

      // Remove animation class after animation completes
      setTimeout(() => {
        cartIcon.classList.remove("animated");
      }, 600); // Duration should match the CSS animation duration
    });
  });
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from local storage

  // Safely calculate total quantity of items in the cart
  const totalCount = cart.reduce((acc, item) => {
    // Ensure the item's quantity is a number, defaulting to 0 if not
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return acc + quantity;
  }, 0);

  // Update the count with total quantity
  cartCountElement.innerText = totalCount;

  // Optional: Add a visual indicator (like a class) if there are items in the cart
  if (totalCount > 0) {
    cartCountElement.classList.add("has-items"); // Add class if there are items
  } else {
    cartCountElement.classList.remove("has-items"); // Remove class if empty
  }
}

// Initialize the application by fetching products
(async function initializeApp() {
  const products = await fetchProducts(); // Fetch the products from API

  // Setup sorting functionality based on fetched products
  sortOptions.addEventListener("change", function () {
    const sortingOption = this.value;

    let sortedProducts = [...products]; // Create a shallow copy of the products array

    if (sortingOption === "name-asc") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "name-desc") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortingOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Render the sorted products
    renderProducts(sortedProducts);
  });

  // Search functionality based on URL query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");

  if (searchQuery) {
    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    renderProducts(filteredProducts);
  }
})();
