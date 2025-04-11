import"./style-D4fjUIh6.js";document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("cart"),o=JSON.parse(localStorage.getItem("cart"))||[];o.length===0?n.innerHTML="<p>Your cart is empty.</p>":(o.forEach(t=>{const e=document.createElement("div");e.classList.add("product-item"),e.innerHTML=`  
              <h3>${t.name}</h3>  
              <p>Price: <strong>$${t.price}</strong></p>  
              <img src="${t.image}" alt="${t.name}" width="100">  
              <button class="remove-button" data-id="${t.id}">Remove From Cart</button>  
          `,n.appendChild(e)}),document.querySelectorAll(".remove-button").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.id,r=o.filter(a=>a.id!==e);localStorage.setItem("cart",JSON.stringify(r)),location.reload()})}))});
