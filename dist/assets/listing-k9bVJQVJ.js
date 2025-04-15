import "./modulepreload-polyfill-B5Qt9EMX.js";
/* empty css              */ document.addEventListener(
  "DOMContentLoaded",
  async function () {
    const o = document.getElementById("product-list"),
      t = document.getElementById("sort-options");
    async function a() {
      try {
        const e = await fetch("https://fakestoreapi.com/products");
        if (!e.ok) throw new Error("Network response was not ok");
        const s = await e.json();
        return i(s), s;
      } catch (e) {
        console.error("Error fetching products:", e),
          (o.innerHTML =
            "<p>Failed to load products. Please try again later.</p>");
      }
    }
    function i(e) {
      if (((o.innerHTML = ""), e.length === 0)) {
        o.innerHTML = "<p>No products found.</p>";
        return;
      }
      e.forEach((s) => {
        const l = Math.floor(Math.random() * 16) + 5,
          d = (s.price * (1 - l / 100)).toFixed(2),
          m = document.createElement("div");
        m.classList.add("product-item"),
          (m.innerHTML = `  
                <span class="discount-badge">${l}% OFF</span>  
                <img src="${s.image}" alt="${s.title}" width="100">  
                <h3>${s.title}</h3>  
                <p><del>$${s.price}</del> <strong>$${d}</strong></p>  
                <button class="like-button" data-id="${s.id}">🤍</button>  
                <button class="quick-view" data-id="${s.id}" data-name="${s.title}" data-image="${s.image}" data-description="${s.description}" data-price="${d}">Quick View</button>  
                <button class="add-to-cart" data-id="${s.id}" data-name="${s.title}" data-price="${d}" data-image="${s.image}">Add to Cart</button>  
            `),
          o.appendChild(m);
      }),
        f(),
        h(),
        p(),
        u();
    }
    const n = await a();
    t.addEventListener("change", function () {
      const e = this.value;
      let s = [...n];
      e === "name-asc"
        ? s.sort((l, d) => l.title.localeCompare(d.title))
        : e === "name-desc"
          ? s.sort((l, d) => d.title.localeCompare(l.title))
          : e === "price-asc"
            ? s.sort((l, d) => l.price - d.price)
            : e === "price-desc" && s.sort((l, d) => d.price - l.price),
        i(s);
    });
    const r = new URLSearchParams(window.location.search).get("query");
    if (r) {
      const e = n.filter((s) =>
        s.title.toLowerCase().includes(r.toLowerCase()),
      );
      i(e);
    }
  },
);
function p() {
  const o = document.querySelectorAll(".quick-view"),
    t = document.getElementById("quick-view-modal"),
    a = document.getElementById("modal-content");
  o.forEach((i) => {
    i.addEventListener("click", () => {
      const n = i.dataset;
      (a.innerHTML = `  
            <span id="close-modal" class="modal-close">&times;</span>  
            <h2>${n.name}</h2>  
            <img src="${n.image}" alt="${n.name}" width="200">  
            <p>${n.description}</p>  
            <p>Price: <strong>$${n.price}</strong></p>  
        `),
        (t.style.display = "flex");
    });
  }),
    t.addEventListener("click", (i) => {
      (i.target.id === "close-modal" || i.target === t) &&
        (t.style.display = "none");
    });
}
function f() {
  const o = document.querySelectorAll(".like-button"),
    t = JSON.parse(localStorage.getItem("wishlist")) || [];
  o.forEach((a) => {
    const i = a.dataset.id;
    t.some((c) => c.id === i) &&
      (a.classList.add("liked"), (a.textContent = "❤️")),
      a.addEventListener("click", () => {
        const c = {
            id: i,
            name: a.parentElement.querySelector("h3").innerText,
            price: a.parentElement.querySelector("strong").innerText,
            image: a.dataset.image,
          },
          r = t.findIndex((e) => e.id === i);
        r === -1
          ? (t.push(c),
            a.classList.add("liked"),
            (a.textContent = "❤️"),
            alert("Added to wishlist!"))
          : (t.splice(r, 1),
            a.classList.remove("liked"),
            (a.textContent = "🤍"),
            alert("Removed from wishlist!")),
          localStorage.setItem("wishlist", JSON.stringify(t));
      });
  });
}
function g(o) {
  const t = JSON.parse(localStorage.getItem("cart")) || [],
    a = t.findIndex((i) => i.id === o.id);
  a !== -1 ? (t[a].quantity += 1) : ((o.quantity = 1), t.push(o)),
    localStorage.setItem("cart", JSON.stringify(t));
}
function h() {
  document.querySelectorAll(".add-to-cart").forEach((t) => {
    t.addEventListener("click", () => {
      const i = {
        id: t.dataset.id,
        name: t.dataset.name,
        price: parseFloat(t.dataset.price),
        image: t.dataset.image,
      };
      g(i), alert("Added to cart!"), u();
    });
  });
}
function u() {
  const o = document.getElementById("cart-count"),
    a = (JSON.parse(localStorage.getItem("cart")) || []).reduce(
      (i, n) => i + n.quantity,
      0,
    );
  (o.innerText = a),
    a > 0 ? o.classList.add("has-items") : o.classList.remove("has-items");
}
(async function () {
  const t = await fetchProducts();
  sortOptions.addEventListener("change", function () {
    const n = this.value;
    let c = [...t];
    n === "name-asc"
      ? c.sort((r, e) => r.title.localeCompare(e.title))
      : n === "name-desc"
        ? c.sort((r, e) => e.title.localeCompare(r.title))
        : n === "price-asc"
          ? c.sort((r, e) => r.price - e.price)
          : n === "price-desc" && c.sort((r, e) => e.price - r.price),
      renderProducts(c);
  });
  const i = new URLSearchParams(window.location.search).get("query");
  if (i) {
    const n = t.filter((c) => c.title.toLowerCase().includes(i.toLowerCase()));
    renderProducts(n);
  }
})();
