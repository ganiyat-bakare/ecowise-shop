document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("product-item");
      cartItem.innerHTML = `  
              <h3>${item.name}</h3>  
              <p>Price: <strong>$${item.price}</strong></p>  
              <img src="${item.image}" alt="${item.name}" width="100">  
              <button class="remove-button" data-id="${item.id}">Remove From Cart</button>  
          `;
      cartContainer.appendChild(cartItem);
    });

    // Remove button functionality
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        location.reload();
      });
    });
  }
});
