document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmountSpan = document.getElementById("total-amount");
  const checkoutButton = document.getElementById("checkout-button");
  const cartFooter = document.querySelector(".cart-footer");
  const pageTitle = document.getElementById("heading");

  const title = document.createElement("h2");
  title.innerText = "My Shopping Cart";
  pageTitle.appendChild(title);

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const price = parseFloat(item.price);
    const totalPrice = (price * quantity).toFixed(2);
    total += price * quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("product");
    cartItem.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: <strong>$${price.toFixed(2)}</strong></p>
      <img src="${item.image}" alt="${item.name}" width="100">
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">-</button>
        <span class="quantity">${quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <p>Total: <strong>$${totalPrice}</strong></p>
      <button class="move-to-wishlist" data-index="${index}">Move to Wishlist</button>
      <button class="remove-button" data-index="${index}">❌</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  totalAmountSpan.innerText = total.toFixed(2);
  cartFooter.classList.remove("hide");

  // Update quantity
  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      cartItems[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload();
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        location.reload();
      }
    });
  });

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload();
    });
  });

  document.querySelectorAll(".move-to-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(cartItems[index]);
      cartItems.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      localStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload();
    });
  });

  checkoutButton.addEventListener("click", function () {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("totalAmount", total.toFixed(2));
    window.location.href = "/checkout/index.html";
  });
});

// Hamburger functionality
const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("open");
});
