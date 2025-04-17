document.addEventListener("DOMContentLoaded", function () {
  const wishlistContainer = document.getElementById("wishlist-container");
  const emptyMessage = document.getElementById("empty-message");
  const pageTitle = document.getElementById("heading");

  const title = document.createElement("h2");
  title.innerText = "Saved Items";

  pageTitle.appendChild(title);

  // Load wishlist from local storage
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function renderWishlist() {
    if (wishlist.length === 0) {
      emptyMessage.style.display = "block";
      wishlistContainer.innerHTML = "";
      return;
    } else {
      emptyMessage.style.display = "none";
    }

    wishlistContainer.innerHTML = "";

    wishlist.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("wishlist-item");
      itemDiv.innerHTML = `  
                <img src="${item.image}" alt="${item.name}" width="100">  
                <div>  
                    <h3>${item.name}</h3>  
                    <p>Price: $${item.price}</p>  
                </div>  
                <button class="move-to-cart" data-id="${item.id}">Move to Cart</button>  
                <button class="remove-from-wishlist" data-id="${item.id}">X</button>  
            `;
      wishlistContainer.appendChild(itemDiv);
    });

    // Add event listeners to buttons
    setupButtonHandlers();
  }

  function setupButtonHandlers() {
    const moveToCartButtons = document.querySelectorAll(".move-to-cart");
    const removeFromWishlistButtons = document.querySelectorAll(
      ".remove-from-wishlist",
    );

    moveToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.dataset.id;
        moveToCart(productId);
      });
    });

    removeFromWishlistButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.dataset.id;
        removeFromWishlist(productId);
      });
    });
  }

  function moveToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = wishlist.findIndex((item) => item.id == productId);
    if (productIndex !== -1) {
      // Add the item to the cart
      const product = wishlist[productIndex];
      const existingProductIndex = cart.findIndex(
        (item) => item.id == productId,
      );
      if (existingProductIndex === -1) {
        // Product is not in the cart; add it with quantity 1
        cart.push({
          ...product,
          quantity: 1,
        });
      } else {
        // If the product exists, we could simply increment the quantity if needed
        cart[existingProductIndex].quantity += 1; 
      }
      localStorage.setItem("cart", JSON.stringify(cart)); 
      wishlist.splice(productIndex, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
      renderWishlist();
    }
  }

  function removeFromWishlist(productId) {
    const productIndex = wishlist.findIndex((item) => item.id == productId);
    if (productIndex !== -1) {
      wishlist.splice(productIndex, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist(); 
    }
  }

  // Initial render of wishlist
  renderWishlist();
});


// Hamburger functionality
const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("open");
});
