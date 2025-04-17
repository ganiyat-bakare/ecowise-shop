document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkout");

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmount = localStorage.getItem("totalAmount") || "0.00";

  // Update order summary
  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const shippingEl = document.getElementById("shipping");
  const orderEl = document.getElementById("order");
  const itemsEl = document.getElementById("items");

  const subtotal = parseFloat(totalAmount);
  const tax = parseFloat((subtotal * 0.075).toFixed(2)); // 7.5% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping if over $100
  const orderTotal = (subtotal + tax + shipping).toFixed(2);

  subtotalEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  taxEl.textContent = `Tax: $${tax}`;
  shippingEl.textContent = `Shipping Estimate: $${shipping}`;
  orderEl.textContent = `Order Total: $${orderTotal}`;
  itemsEl.textContent = `Amount of items: ${cartItems.length}`;

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fname = checkoutForm.elements["fname"].value.trim();
    const lname = checkoutForm.elements["lname"].value.trim();
    const fullName = `${fname} ${lname}`;
    const street = checkoutForm.elements["street"].value.trim();
    const city = checkoutForm.elements["city"].value.trim();
    const state = checkoutForm.elements["state"].value.trim();
    const zip = checkoutForm.elements["zip"].value.trim();
    const cardNumber = checkoutForm.elements["cardNumber"].value.trim();
    const expiration = checkoutForm.elements["expiration"].value.trim();
    const code = checkoutForm.elements["code"].value.trim();

    // Minimal validation
    if (
      !fname ||
      !lname ||
      !street ||
      !city ||
      !state ||
      !zip ||
      !cardNumber ||
      !expiration ||
      !code
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const orderDetails = {
      fullName,
      address: `${street}, ${city}, ${state}, ${zip}`,
      payment: {
        cardNumber,
        expiration,
        code,
      },
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      tax,
      shipping,
      total: orderTotal,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "/orders/index.html";
    }, 1000);
  });
});
