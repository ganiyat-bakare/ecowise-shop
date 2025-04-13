document.addEventListener("DOMContentLoaded", function () {  
  const cartContainer = document.getElementById("cart");  
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];  
  const cartFooter = document.createElement("div");  
  cartFooter.classList.add("cart-footer", "hide"); // Initial hide the footer for visibility management  
  const totalParagraph = document.createElement("p");  
  const totalAmountSpan = document.createElement("span");  
  totalAmountSpan.id = "total-amount"; // ID to update total  
  totalParagraph.innerText = "Total: $";  
  totalParagraph.appendChild(totalAmountSpan);  
  cartFooter.appendChild(totalParagraph);  
  cartContainer.appendChild(cartFooter); // Append the footer to cart container  

  if (cartItems.length === 0) {  
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";  
    cartFooter.classList.add("hide"); // Keep footer hidden if empty  
  } else {  
    let total = 0; // Initialize total  

    // Render each cart item  
    cartItems.forEach((item) => {  
      const cartItem = document.createElement("div");  
      cartItem.classList.add("product-item");  
      cartItem.innerHTML = `  
          <h3>${item.name} x ${item.quantity}</h3>  
          <p>Price: <strong>$${item.price}</strong> x <strong>${item.quantity || 1}</strong></p>  
          <img src="${item.image}" alt="${item.name}" width="100">  
          <button class="remove-button" data-id="${item.id}">❌</button>  
      `;  
      cartContainer.appendChild(cartItem);  

      // Ensure price is a number  
      const price = parseFloat(item.price); // Use parseFloat to handle price as a number  
      const quantity = item.quantity || 1; // Default to 1 if quantity is not defined  

      console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}`); // Debug logging  

      // Check if price and quantity are valid numbers  
      if (!isNaN(price) && !isNaN(quantity)) {  
        total += price * quantity; // Update total calculation  
      } else {  
        console.error("Invalid price or quantity for item:", item);  
      }  
    });  

    // Show the total and remove footer class "hide"  
    totalAmountSpan.innerText = total.toFixed(2); // Format total to 2 decimal places  
    cartFooter.classList.remove("hide");  

    // Remove button functionality  
    const removeButtons = document.querySelectorAll(".remove-button");  
    removeButtons.forEach((button) => {  
      button.addEventListener("click", () => {  
        const productId = button.dataset.id;  
        const updatedCart = cartItems.filter((item) => item.id !== productId);  
        localStorage.setItem("cart", JSON.stringify(updatedCart));  
        location.reload(); // Refresh to update cart display  
      });  
    });  
  }  
});  