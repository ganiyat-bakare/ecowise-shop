document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".register-link"),
    document.querySelector(".login-link");
  const m = document.querySelector(".form-box.login"),
    l = document.querySelector(".form-box.register"),
    i = document.getElementById("signup-form"),
    t = document.getElementById("signup-message"),
    g = document.getElementById("login-form"),
    o = document.getElementById("login-message");
  i.addEventListener("submit", async (e) => {
    e.preventDefault();
    const a = document.getElementById("username").value,
      c = document.getElementById("email-signup").value,
      s = document.getElementById("password-signup").value,
      n = document.getElementById("confirm-password").value;
    if (s !== n) {
      (t.textContent = "Passwords do not match!"), (t.style.color = "red");
      return;
    }
    const r = { username: a, email: c, password: s };
    try {
      const d = await fetch("https://api.example.com/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        }),
        u = await d.json();
      d.ok
        ? ((t.textContent = "Account created successfully! Redirecting..."),
          (t.style.color = "green"),
          setTimeout(() => {
            (m.style.display = "block"), (l.style.display = "none"), i.reset();
          }, 2e3))
        : ((t.textContent = u.message || "Sign up failed. Please try again."),
          (t.style.color = "red"));
    } catch (d) {
      console.error("Error signing up:", d),
        (t.textContent = "An error occurred. Please try again."),
        (t.style.color = "red");
    }
  }),
    g.addEventListener("submit", async (e) => {
      e.preventDefault();
      const a = document.getElementById("email").value,
        c = document.getElementById("password").value,
        s = { email: a, password: c };
      try {
        const n = await fetch("https://api.example.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(s),
          }),
          r = await n.json();
        n.ok
          ? (localStorage.setItem("authToken", r.token),
            (window.location.href = "orders.html"))
          : ((o.textContent = r.message || "Login failed. Please try again."),
            (o.style.color = "red"));
      } catch (n) {
        console.error("Error logging in:", n),
          (o.textContent = "An error occurred. Please try again."),
          (o.style.color = "red");
      }
    }),
    document
      .getElementById("show-password-signup")
      .addEventListener("change", function () {
        const e = document.getElementById("password-signup");
        e.type = this.checked ? "text" : "password";
      }),
    document
      .getElementById("show-confirm-password")
      .addEventListener("change", function () {
        const e = document.getElementById("confirm-password");
        e.type = this.checked ? "text" : "password";
      }),
    document
      .getElementById("show-password-login")
      .addEventListener("change", function () {
        const e = document.getElementById("password");
        e.type = this.checked ? "text" : "password";
      }),
    (l.style.display = "none");
});
