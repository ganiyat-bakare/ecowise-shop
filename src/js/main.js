document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    // console.error("Error fetching data from Fake Store API:", error);
    document.getElementById("error-message").innerText =
      "Failed to fetch products. Please try again later.";
  }
};

const displayProducts = (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";

    productItem.innerHTML = `  
            <img src="${product.image}" alt="${product.title}" width="100" />  
            <h3>${product.title}</h3>  
            <p>Price: $${product.price}</p>  
        `;

    productList.appendChild(productItem);
  });
};

// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'DsAEWG8ggPp2qH2YhnzVEy2d6QEPcZAm',
//   issuerBaseURL: 'https://dev-zml6xoi3q1u87co6.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
