import"./style-BjrOFaNX.js";document.addEventListener("DOMContentLoaded",function(){const a=document.getElementById("cart"),n=JSON.parse(localStorage.getItem("cart"))||[],u=document.getElementById("total-amount"),m=document.getElementById("checkout-button"),r=document.querySelector(".cart-footer"),g=document.getElementById("heading"),l=document.createElement("h2");if(l.innerText="My Shopping Cart",g.appendChild(l),n.length===0){a.innerHTML="<p>Your cart is empty.</p>",r.classList.add("hide");return}let c=0;a.innerHTML="",n.forEach((t,e)=>{const o=t.quantity||1,i=parseFloat(t.price),h=(i*o).toFixed(2);c+=i*o;const s=document.createElement("div");s.classList.add("product"),s.innerHTML=`
      <h3>${t.name}</h3>
      <p>Price: <strong>$${i.toFixed(2)}</strong></p>
      <img src="${t.image}" alt="${t.name}" width="100">
      <div class="quantity-controls">
        <button class="decrease" data-index="${e}">-</button>
        <span class="quantity">${o}</span>
        <button class="increase" data-index="${e}">+</button>
      </div>
      <p>Total: <strong>$${h}</strong></p>
      <button class="move-to-wishlist" data-index="${e}">Move to Wishlist</button>
      <button class="remove-button" data-index="${e}">❌</button>
    `,a.appendChild(s)}),u.innerText=c.toFixed(2),r.classList.remove("hide"),document.querySelectorAll(".increase").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.index;n[e].quantity++,localStorage.setItem("cart",JSON.stringify(n)),location.reload()})}),document.querySelectorAll(".decrease").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.index;n[e].quantity>1&&(n[e].quantity--,localStorage.setItem("cart",JSON.stringify(n)),location.reload())})}),document.querySelectorAll(".remove-button").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.index;n.splice(e,1),localStorage.setItem("cart",JSON.stringify(n)),location.reload()})}),document.querySelectorAll(".move-to-wishlist").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.index,o=JSON.parse(localStorage.getItem("wishlist"))||[];o.push(n[e]),n.splice(e,1),localStorage.setItem("wishlist",JSON.stringify(o)),localStorage.setItem("cart",JSON.stringify(n)),location.reload()})}),m.addEventListener("click",function(){localStorage.setItem("cart",JSON.stringify(n)),localStorage.setItem("totalAmount",c.toFixed(2)),window.location.href="checkout/index.html"})});const p=document.querySelector(".navigation"),d=document.querySelector("#menu");d.addEventListener("click",()=>{p.classList.toggle("open"),d.classList.toggle("open")});
