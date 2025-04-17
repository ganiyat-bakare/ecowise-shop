document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  // LOGIN
  if (loginForm) {
    const loginMessage = document.getElementById("login-message");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        // Save login session
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem(
          "authToken",
          JSON.stringify({ email: user.email }),
        );

        loginMessage.textContent = "Login successful! Redirecting...";
        loginMessage.style.color = "green";

        setTimeout(() => {
          window.location.href = "../orders/index.html";
        }, 1500);
      } else {
        loginMessage.textContent = "Invalid email or password.";
        loginMessage.style.color = "red";
      }
    });

    document
      .getElementById("show-password-login")
      .addEventListener("change", function () {
        document.getElementById("password").type = this.checked
          ? "text"
          : "password";
      });
  }

  // SIGNUP
  if (signupForm) {
    const signupMessage = document.getElementById("signup-message");

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email-signup").value.trim();
      const password = document.getElementById("password-signup").value.trim();
      const confirmPassword = document
        .getElementById("confirm-password")
        .value.trim();

      if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match!";
        signupMessage.style.color = "red";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((user) => user.email === email)) {
        signupMessage.textContent = "User already exists!";
        signupMessage.style.color = "red";
        return;
      }

      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      signupMessage.textContent = "Account created! Redirecting to login...";
      signupMessage.style.color = "green";

      setTimeout(() => {
        window.location.href = "/auth/login.html";
      }, 1500);
    });

    document
      .getElementById("show-password-signup")
      .addEventListener("change", function () {
        document.getElementById("password-signup").type = this.checked
          ? "text"
          : "password";
      });

    document
      .getElementById("show-confirm-password")
      .addEventListener("change", function () {
        document.getElementById("confirm-password").type = this.checked
          ? "text"
          : "password";
      });
  }
});

// Hamburger menu functionality
const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
  mainnav.classList.toggle("open");
  hambutton.classList.toggle("open");
});
