import "./modulepreload-polyfill-B5Qt9EMX.js";
/* empty css              */ function i(t, n = null) {
  setTimeout(() => {
    let e;
    n
      ? (e = `Registration successful! Welcome, ${n}!`)
      : (e = `Success! A confirmation email has been sent to ${t}.`),
      alert(e);
  }, 1e3);
}
function a() {
  const t = document.getElementById("signup-form");
  t &&
    t.addEventListener("submit", (n) => {
      n.preventDefault();
      const e = document.getElementById("username").value,
        s = document.getElementById("email-signup").value,
        l = document.getElementById("password-signup").value;
      if (!s || !e || !l) {
        alert("Please fill in all fields.");
        return;
      }
      i(s, e), t.reset();
    });
}
function m() {
  const t = document.getElementById("newsletterSubmit"),
    n = document.getElementById("newsletterEmail"),
    e = document.getElementById("newsletterMessage");
  t &&
    t.addEventListener("click", () => {
      const s = n.value.trim();
      if (s === "") {
        (e.innerText = "Please enter a valid email address."),
          e.classList.remove("hidden");
        return;
      }
      i(s), (n.value = "");
    });
}
document.addEventListener("DOMContentLoaded", () => {
  a(), m();
});
