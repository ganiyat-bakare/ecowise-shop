import "./modulepreload-polyfill-B5Qt9EMX.js";
/* empty css              */ const s = document.querySelector(".navigation"),
  t = document.querySelector("#menu");
t.addEventListener("click", () => {
  s.classList.toggle("open"), t.classList.toggle("open");
});
const r = new Date().getFullYear();
document.getElementById("currentyear").textContent = r;
const l = document.getElementById("newsletterSubmit"),
  n = document.getElementById("newsletterEmail"),
  e = document.getElementById("newsletterMessage");
l.addEventListener("click", function () {
  if (n.value.trim() === "") {
    (e.innerText = "Please enter a valid email address."),
      e.classList.remove("hidden");
    return;
  }
  setTimeout(() => {
    (e.innerText = "Thank you for subscribing to our newsletter!"),
      e.classList.remove("hidden");
  }, 1e3),
    (n.value = "");
});
