import "./style-f1VwBhzE.js";
document.addEventListener("DOMContentLoaded", function () {
  const r = document.getElementById("cart"),
    c = JSON.parse(localStorage.getItem("cart")) || [],
    e = document.createElement("div");
  e.classList.add("cart-footer", "hide");
  const d = document.createElement("p"),
    s = document.createElement("span");
  if (
    ((s.id = "total-amount"),
    (d.innerText = "Total: $"),
    d.appendChild(s),
    e.appendChild(d),
    r.appendChild(e),
    c.length === 0)
  )
    (r.innerHTML = "<p>Your cart is empty.</p>"), e.classList.add("hide");
  else {
    let i = 0;
    c.forEach((t) => {
      const n = document.createElement("div");
      n.classList.add("product-item"),
        (n.innerHTML = `  
          <h3>${t.name}</h3>  
          <p>Price: <strong>$${t.price}</strong> x <strong>${t.quantity || 1}</strong></p>  
          <img src="${t.image}" alt="${t.name}" width="100">  
          <button class="remove-button" data-id="${t.id}">❌</button>  
      `),
        r.appendChild(n);
      const o = parseFloat(t.price),
        a = t.quantity || 1;
      console.log(`Item: ${t.name}, Price: ${o}, Quantity: ${a}`),
        !isNaN(o) && !isNaN(a)
          ? (i += o * a)
          : console.error("Invalid price or quantity for item:", t);
    }),
      (s.innerText = i.toFixed(2)),
      e.classList.remove("hide"),
      document.querySelectorAll(".remove-button").forEach((t) => {
        t.addEventListener("click", () => {
          const n = t.dataset.id,
            o = c.filter((a) => a.id !== n);
          localStorage.setItem("cart", JSON.stringify(o)), location.reload();
        });
      });
  }
});
