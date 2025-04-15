document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutMessage = document.getElementById("checkout-message");

  // Load cart items and total amount from local storage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const totalAmount = localStorage.getItem("totalAmount") || "0.00";

  // Display total amount on the checkout page
  const totalAmountDisplay = document.getElementById("total-amount-display");
  totalAmountDisplay.innerText = `Total: $${totalAmount}`; // Display total amount

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect user input
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    // Simple validation
    if (!validateEmail(email)) {
      checkoutMessage.textContent = "Please enter a valid email address.";
      return;
    }

    if (!validateCard(cardNumber)) {
      checkoutMessage.textContent = "Please enter a valid card number.";
      return;
    }

    const orderDetails = {
      fullName,
      email,
      address,
      cartItems,
      totalAmount,
      cardNumber,
      expiry,
      cvv,
    };

    // Simulating order processing (API call can be added here)
    console.log("Order submitted:", orderDetails);

    // Show success message and clear cart
    checkoutMessage.textContent = "Your order has been placed successfully!";
    localStorage.removeItem("cart"); // Clear the cart on successful checkout
    checkoutForm.reset(); // Reset the form after submission

    setTimeout(() => {
      window.location.href = "orders/index.html"; // Redirect to thank you page
    }, 2000);
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return re.test(String(email).toLowerCase());
  }

  function validateCard(cardNumber) {
    const re = /^\d{16}$/; // Basic 16-digit card number validation
    return re.test(cardNumber);
  }

  // Function to handle the checkout form submission
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect user input
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    // ... validate inputs ...

    const orderDetails = {
      fullName,
      email,
      address,
      cartItems,
      totalAmount,
      cardNumber,
      expiry,
      cvv,
    };

    // Here you can simulate storing the order or sending it to an API
    console.log("Order submitted:", orderDetails);

    // Store order in local storage (simulating persistence)
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // Redirect to the success page after a brief delay
    setTimeout(() => {
      window.location.href = "orders/index.html"; // Redirect to success page
    }, 2000);
  });
});
