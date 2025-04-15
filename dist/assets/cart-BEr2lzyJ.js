import "./modulepreload-polyfill-B5Qt9EMX.js";
/* empty css              */ document.addEventListener(
  "DOMContentLoaded",
  function () {
    const r = document.getElementById("cart"),
      c = JSON.parse(localStorage.getItem("cart")) || [],
      e = document.createElement("div");
    e.classList.add("cart-footer", "hide");
    const i = document.createElement("p"),
      s = document.createElement("span");
    if (
      ((s.id = "total-amount"),
      e.appendChild(i),
      r.appendChild(e),
      c.length === 0)
    )
      (r.innerHTML = "<p>Your cart is empty.</p>"), e.classList.add("hide");
    else {
      let d = 0;
      c.forEach((t) => {
        const o = document.createElement("div");
        o.classList.add("product-item"),
          (o.innerHTML = `  
          <h3>${t.name} x ${t.quantity}</h3>  
          <p>Price: <strong>$${t.price}</strong> x <strong>${t.quantity || 1}</strong></p>  
          <img src="${t.image}" alt="${t.name}" width="100">  
          <button class="remove-button" data-id="${t.id}">❌</button>  
      `),
          r.appendChild(o);
        const n = parseFloat(t.price),
          a = t.quantity || 1;
        console.log(`Item: ${t.name}, Price: ${n}, Quantity: ${a}`),
          !isNaN(n) && !isNaN(a)
            ? (d += n * a)
            : console.error("Invalid price or quantity for item:", t);
      }),
        (s.innerText = d.toFixed(2)),
        e.classList.remove("hide"),
        document.querySelectorAll(".remove-button").forEach((t) => {
          t.addEventListener("click", () => {
            const o = t.dataset.id,
              n = c.filter((a) => a.id !== o);
            localStorage.setItem("cart", JSON.stringify(n)), location.reload();
          });
        });
    }
  },
);
