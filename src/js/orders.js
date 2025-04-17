document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // If user not logged in, redirect
  if (isLoggedIn !== "true" || !currentUser) {
    alert("Please login to view your orders.");
    window.location.href = "/auth/login.html";
    return;
  }

  // Show welcome message if element exists
  const welcomeUser = document.getElementById("welcome-user");
  if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${currentUser.username}!`;
  }

  // Show logout button if element exists
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.style.display = "block";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "/auth/login.html";
    });
  }

  // Fetch and display the order
  const order = JSON.parse(localStorage.getItem("latestOrder"));

  if (!order) {
    document.body.innerHTML = "<main><h2>No order found.</h2></main>";
    return;
  }

  document.getElementById("customer-info").textContent =
    `Order for: ${order.fullName}`;

  const itemsContainer = document.getElementById("order-items");
  order.items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    itemsContainer.appendChild(div);
  });

  const formatMoney = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  document.getElementById("summary-subtotal").textContent =
    `Subtotal: ${formatMoney(order.subtotal)}`;
  document.getElementById("summary-tax").textContent =
    `Tax: ${formatMoney(order.tax)}`;
  document.getElementById("summary-shipping").textContent =
    `Shipping: ${formatMoney(order.shipping)}`;
  document.getElementById("summary-total").textContent =
    `Total: ${formatMoney(order.total)}`;

  localStorage.removeItem("latestOrder");
});
