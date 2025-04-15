document.addEventListener("DOMContentLoaded", function () {
  const viewOrderButton = document.getElementById("view-order-button");
  const orderSummary = document.getElementById("order-summary");
  const backToHomeButton = document.getElementById("back-to-home");

  // Check if we are on the success page
  if (window.location.pathname.includes("orders/index.html")) {
    viewOrderButton.addEventListener("click", function () {
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

      if (orderDetails) {
        // Store order details in local storage for viewing
        localStorage.setItem("orderDetailsView", JSON.stringify(orderDetails));
        // Redirect to the orderDetails.html page
        window.location.href = "orderDetails.html"; // Ensure this path is correct
      } else {
        alert("No order details found. Please try again.");
      }
    });
  }

  // Check if we are on the order details page
  if (window.location.pathname.includes("orderDetails.html")) {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetailsView"));

    // Validate if order details exist
    if (orderDetails) {
      // Display customer details
      orderSummary.innerHTML += `<h2>Customer Information</h2>`;
      orderSummary.innerHTML += `<p><strong>Name:</strong> ${orderDetails.fullName}</p>`;
      orderSummary.innerHTML += `<p><strong>Email:</strong> ${orderDetails.email}</p>`;
      orderSummary.innerHTML += `<p><strong>Address:</strong> ${orderDetails.address}</p>`;

      // Display order items
      orderSummary.innerHTML += `<h2>Order Items</h2>`;
      orderDetails.cartItems.forEach((item) => {
        orderSummary.innerHTML += `  
                    <div class="order-item">  
                        <p><strong>Item:</strong> ${item.name}</p>  
                        <p><strong>Price:</strong> $${item.price.toFixed(2)} x ${item.quantity}</p>  
                    </div>  
                `;
      });

      // Display total amount
      orderSummary.innerHTML += `<h3>Total: $${orderDetails.totalAmount}</h3>`;
    } else {
      orderSummary.innerHTML = "<p>No order details available.</p>";
    }

    // Event listener for the "Back to Home" button
    backToHomeButton.addEventListener("click", function () {
      window.location.href = "src/index.html"; // Adjust the path as needed
    });
  }
});
