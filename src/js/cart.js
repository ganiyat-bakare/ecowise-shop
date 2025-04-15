document.addEventListener("DOMContentLoaded", function () {  
  const cartContainer = document.getElementById("cart");  
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];  
  const cartFooter = document.createElement("div");  
  cartFooter.classList.add("cart-footer", "hide"); 
  const totalParagraph = document.createElement("p");  
  const totalAmountSpan = document.getElementById("total-amount");   
  totalParagraph.innerHTML = `<h2>My Shopping Cart</h2>`;  
  cartFooter.appendChild(totalParagraph);  
  cartContainer.appendChild(cartFooter);   

  if (cartItems.length === 0) {  
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";  
    cartFooter.classList.add("hide"); 
  } else {  
    let total = 0;  

    // Render each cart item  
    cartItems.forEach((item) => {  
      const cartItem = document.createElement("div");  
      cartItem.classList.add("product-item");  
      cartItem.innerHTML = `  
          <h3>${item.name} x ${item.quantity || 1}</h3>  
          <p>Price: <strong>$${item.price.toFixed(2)}</p>  
          <img src="${item.image}" alt="${item.name}" width="100">  
          <button class="remove-button" data-id="${item.id}">❌</button>  
      `;  
      cartContainer.appendChild(cartItem);  

      // Ensure price is a number  
      const price = parseFloat(item.price);  
      const quantity = item.quantity || 1; 

      // Add to the total only if prices and quantities are valid  
      if (!isNaN(price) && !isNaN(quantity)) {  
        total += price * quantity;   
      }  
    });  

    // Show the total in the designated total amount span  
    totalAmountSpan.innerText = total.toFixed(2); 
    cartFooter.classList.remove("hide");  

    // Add button functionality to remove items  
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