const productList = document.getElementById("product-list");
const sortOptions = document.getElementById("sort-options");

// Function to fetch products
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    productList.innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
    return [];
  }
}

// Function to render products
function renderProducts(productsToRender) {
  productList.innerHTML = "";

  if (productsToRender.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  // Track discounts for session consistency
  const productDiscounts =
    JSON.parse(sessionStorage.getItem("productDiscounts")) || {};

  productsToRender.forEach((product) => {
    let discount = productDiscounts[product.id];

    if (!discount) {
      discount = Math.floor(Math.random() * 16) + 5; // 5% to 20%
      productDiscounts[product.id] = discount;
    }

    const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);

    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <div class="product-image-wrapper">
        <span class="discount-badge">${discount}% OFF</span>
        <img src="${product.image}" alt="${product.title}" width="100">
      </div>
      <h3>${product.title}</h3>
      <p><del>$${product.price}</del> <strong>$${discountedPrice}</strong></p>
      <div class="product-buttons">
        <button class="like-button" data-id="${product.id}" data-image="${product.image}">🤍</button>
        <button 
          class="quick-view" 
          data-id="${product.id}" 
          data-name="${product.title}" 
          data-image="${product.image}" 
          data-description="${product.description}" 
          data-price="${discountedPrice}" 
          data-original-price="${product.price}">
          Quick View
        </button>
        <button class="add-to-cart" data-id="${product.id}" data-name="${product.title}" data-price="${discountedPrice}" data-image="${product.image}">Add to Cart</button>
      </div>
    `;

    productList.appendChild(productItem);
  });

  sessionStorage.setItem("productDiscounts", JSON.stringify(productDiscounts));

  updateLikeButtons();
  updateAddToCartButtons();
  setupQuickViewButtons();
  updateCartCount();
}

function setupQuickViewButtons() {
  const quickViewButtons = document.querySelectorAll(".quick-view");
  const quickViewModal = document.getElementById("quick-view-modal");
  const modalContent = document.getElementById("modal-content");

  quickViewButtons.forEach((button) => {
    button.style.display = "inline-block";
    button.addEventListener("click", () => {
      const productData = button.dataset;
      const originalPrice = parseFloat(productData.originalPrice || 0);
      const discountedPrice = parseFloat(productData.price);
      const savings = originalPrice
        ? (originalPrice - discountedPrice).toFixed(2)
        : null;

      modalContent.innerHTML = `
        <span id="close-modal" class="modal-close">&times;</span>
        <h2>${productData.name}</h2>
        <img src="${productData.image}" alt="${productData.name}" width="200">
        <p>${productData.description}</p>
        <p>
          <del>$${originalPrice.toFixed(2)}</del> 
          <strong>$${discountedPrice.toFixed(2)}</strong>
        </p>
        ${savings ? `<p class="discount-flag">You saved: $${savings}</p>` : ""}
      `;

      quickViewModal.style.display = "flex";
    });
  });

  quickViewModal.addEventListener("click", (event) => {
    if (event.target.id === "close-modal" || event.target === quickViewModal) {
      quickViewModal.style.display = "none";
    }
  });
}

function updateLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-button");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  likeButtons.forEach((button) => {
    const productId = button.dataset.id;
    const isLiked = wishlist.some((item) => item.id === productId);
    if (isLiked) {
      button.classList.add("liked");
      button.textContent = "❤️";
    }

    button.addEventListener("click", () => {
      const productCard = button.closest(".product-item");
      const imageSrc = productCard.querySelector("img").src;
      const name = productCard.querySelector("h3").innerText;
      const price = productCard.querySelector("strong").innerText;

      const productInfo = {
        id: productId,
        name: name,
        price: price,
        image: imageSrc,
      };

      const existingIndex = wishlist.findIndex((item) => item.id === productId);
      if (existingIndex === -1) {
        wishlist.push(productInfo);
        button.classList.add("liked");
        button.textContent = "❤️";
      } else {
        wishlist.splice(existingIndex, 1);
        button.classList.remove("liked");
        button.textContent = "🤍";
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });
}

function addToCart(product, quantity = 1) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cartItems.findIndex((item) => item.id === product.id);

  if (existingIndex !== -1) {
    cartItems[existingIndex].quantity += quantity;
  } else {
    product.quantity = quantity;
    cartItems.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function updateAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const qtyModal = document.getElementById("qty-modal");
  const qtyInput = document.getElementById("qty-input");
  const confirmBtn = document.getElementById("qty-confirm");
  const cancelBtn = document.getElementById("qty-cancel");

  let currentProduct = null;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentProduct = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image,
      };

      qtyInput.value = 1;
      qtyModal.classList.add("show");
    });
  });

  confirmBtn.addEventListener("click", () => {
    const quantity = parseInt(qtyInput.value) || 1;
    if (currentProduct) {
      addToCart(currentProduct, quantity);
      updateCartCount();
    }
    qtyModal.classList.remove("show");

    // Optional: Add a toast or animation
    const cartIcon = document.querySelector("#cart-icon");
    cartIcon.classList.add("animated");
    setTimeout(() => cartIcon.classList.remove("animated"), 600);
  });

  cancelBtn.addEventListener("click", () => {
    qtyModal.classList.remove("show");
    currentProduct = null;
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  const cartCountElem = document.getElementById("cart-count");
  if (totalCount > 0) {
    cartCountElem.textContent = totalCount;
    cartCountElem.style.display = "inline-block";
    cartCountElem.classList.remove("pop");
    void cartCountElem.offsetWidth;
    cartCountElem.classList.add("pop");
  } else {
    cartCountElem.style.display = "none";
  }
}

// Initialize

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchProducts();
  renderProducts(products);

  sortOptions.addEventListener("change", function () {
    const sortingOption = this.value;
    let sorted = [...products];

    if (sortingOption === "name-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "name-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortingOption === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    renderProducts(sorted);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query");
  if (searchQuery) {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    renderProducts(filtered);
  }
});
