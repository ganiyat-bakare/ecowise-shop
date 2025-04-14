//

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

// Hamburger menu functionality
const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("open");
});

// Set copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const newsletterSubmit = document.getElementById("newsletterSubmit");
const newsletterEmailInput = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");
newsletterSubmit.addEventListener("click", function () {
  const email = newsletterEmailInput.value.trim();
  if (email === "") {
    newsletterMessage.innerText = "Please enter a valid email address.";
    newsletterMessage.classList.remove("hidden");
    return;
  }
  // Simulate an API call for newsletter sign-up
  // In a real-world scenario, you would send the `email` to your server here.
  setTimeout(() => {
    // Assume the subscription was successful
    newsletterMessage.innerText =
      "Thank you for subscribing to our newsletter!";
    newsletterMessage.classList.remove("hidden");
  }, 1000);
  newsletterEmailInput.value = ""; // Clear the input after submit
});
