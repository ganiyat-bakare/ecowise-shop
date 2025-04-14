import "./style-f1VwBhzE.js";
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((a) => a.json())
    .then((a) => {
      const e = document.getElementById("product-list"),
        t = document.getElementById("sort-options");
      function n(s) {
        (e.innerHTML = ""),
          s.forEach((i) => {
            const o = Math.floor(Math.random() * 16) + 5,
              c = (i.price * (1 - o / 100)).toFixed(2),
              r = document.createElement("div");
            r.classList.add("product-item"),
              (r.innerHTML = `  
                        <span class="discount-badge">${o}% OFF</span>  
                        <img src="${i.image}" alt="${i.title}" width="100">  
                        <h3>${i.title}</h3>  
                        <p><del>$${i.price}</del> <strong>$${c}</strong></p>  
                        <button class="like-button" data-id="${i.id}">🤍</button>  
                        <button class="quick-view" data-id="${i.id}" data-name="${i.title}" data-image="${i.image}" data-description="${i.description}" data-price="${c}">Quick View</button>  
                        <button class="add-to-cart" data-id="${i.id}" data-name="${i.title}" data-price="${c}" data-image="${i.image}">Add to Cart</button>  
                    `),
              e.appendChild(r);
          }),
          u(),
          p(),
          m(),
          l();
      }
      n(a),
        t.addEventListener("change", function () {
          const s = this.value;
          let i = [...a];
          s === "name-asc"
            ? i.sort((o, c) => o.title.localeCompare(c.title))
            : s === "name-desc"
              ? i.sort((o, c) => c.title.localeCompare(o.title))
              : s === "price-asc"
                ? i.sort((o, c) => o.price - c.price)
                : s === "price-desc" && i.sort((o, c) => c.price - o.price),
            n(i);
        });
    });
});
function m() {
  const a = document.querySelectorAll(".quick-view"),
    e = document.getElementById("quick-view-modal"),
    t = document.getElementById("modal-content");
  a.forEach((n) => {
    n.addEventListener("click", () => {
      const s = n.dataset;
      (t.innerHTML = `  
              <span id="close-modal" class="modal-close">&times;</span>  
              <h2>${s.name}</h2>  
              <img src="${s.image}" alt="${s.name}" width="200">  
              <p>${s.description}</p>  
              <p>Price: <strong>$${s.price}</strong></p>  
          `),
        (e.style.display = "flex");
    });
  }),
    e.addEventListener("click", (n) => {
      (n.target.id === "close-modal" || n.target === e) &&
        (e.style.display = "none");
    });
}
function u() {
  const a = document.querySelectorAll(".like-button"),
    e = JSON.parse(localStorage.getItem("wishlist")) || [];
  a.forEach((t) => {
    const n = t.dataset.id;
    e.some((i) => i.id === n) &&
      (t.classList.add("liked"), (t.textContent = "❤️")),
      t.addEventListener("click", () => {
        const i = {
            id: n,
            name: t.parentElement.querySelector("h3").innerText,
            price: t.parentElement.querySelector("strong").innerText,
            image: t.dataset.image,
          },
          o = e.findIndex((c) => c.id === n);
        o === -1
          ? (e.push(i),
            t.classList.add("liked"),
            (t.textContent = "❤️"),
            alert("Added to wishlist!"))
          : (e.splice(o, 1),
            t.classList.remove("liked"),
            (t.textContent = "🤍"),
            alert("Removed from wishlist!")),
          localStorage.setItem("wishlist", JSON.stringify(e));
      });
  });
}
function p() {
  document.querySelectorAll(".add-to-cart").forEach((e) => {
    e.addEventListener("click", () => {
      const t = e.dataset.id,
        n = JSON.parse(localStorage.getItem("cart")) || [],
        s = prompt(
          "Enter quantity for " +
            e.dataset.name +
            " (Default is 1 if left empty):",
          "1",
        ),
        i = parseInt(s) || 1,
        o = {
          id: t,
          name: e.parentElement.querySelector("h3").innerText,
          price: parseFloat(e.parentElement.querySelector("strong").innerText),
          image: e.dataset.image,
          quantity: i,
        },
        c = n.findIndex((r) => r.id === t);
      c === -1
        ? (n.push(o), alert("Added to cart!"))
        : ((n[c].quantity += i), alert("Quantity incremented in the cart!")),
        localStorage.setItem("cart", JSON.stringify(n)),
        l();
    });
  });
}
function l() {
  const a = document.getElementById("cart-count"),
    t = (JSON.parse(localStorage.getItem("cart")) || []).reduce(
      (n, s) => n + s.quantity,
      0,
    );
  (a.innerText = t),
    t > 0 ? a.classList.add("has-items") : a.classList.remove("has-items");
}
const g = new URLSearchParams(window.location.search),
  d = g.get("query");
d &&
  fetch("https://fakestoreapi.com/products")
    .then((a) => a.json())
    .then((a) => {
      const e = a.filter((t) =>
        t.title.toLowerCase().includes(d.toLowerCase()),
      );
      h(e);
    })
    .catch((a) => console.error("Error fetching products:", a));
function h(a) {
  const e = document.getElementById("product-list");
  if (((e.innerHTML = ""), a.length === 0)) {
    e.innerHTML = "<p>No products found.</p>";
    return;
  }
  a.forEach((t) => {
    const n = document.createElement("div");
    n.classList.add("product-item"),
      (n.innerHTML = `  
          <img src="${t.image}" alt="${t.title}" width="100">  
          <h3>${t.title}</h3>  
          <p>Price: $${t.price}</p>  
        `),
      e.appendChild(n);
  });
}
