document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        // Fake payment validation
        if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
            document.getElementById("checkout-message").textContent = "Invalid payment details!";
            return;
        }

        // Retrieve cart items
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartItems.length === 0) {
            document.getElementById("checkout-message").textContent = "Cart is empty!";
            return;
        }

        const newOrder = {
            id: Date.now(),
            fullName,
            email,
            address,
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: "Processing",
        };

        // Save order
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear cart & redirect
        localStorage.removeItem("cart");
        document.getElementById("checkout-message").textContent = "Order placed! Redirecting...";
        setTimeout(() => window.location.href = "../orders/order-history.html", 2000);
    });
});
