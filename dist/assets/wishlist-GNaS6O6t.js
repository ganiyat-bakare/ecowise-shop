import"./style-f1VwBhzE.js";document.addEventListener("DOMContentLoaded",function(){const s=document.getElementById("wishlist-container"),d=document.getElementById("empty-message");let n=JSON.parse(localStorage.getItem("wishlist"))||[];function c(){if(n.length===0){d.style.display="block",s.innerHTML="";return}else d.style.display="none";s.innerHTML="",n.forEach(t=>{const e=document.createElement("div");e.classList.add("wishlist-item"),e.innerHTML=`  
                <img src="${t.image}" alt="${t.name}" width="100">  
                <div>  
                    <h3>${t.name}</h3>  
                    <p>Price: $${t.price}</p>  
                </div>  
                <button class="move-to-cart" data-id="${t.id}">Move to Cart</button>  
                <button class="remove-from-wishlist" data-id="${t.id}">X</button>  
            `,s.appendChild(e)}),a()}function a(){const t=document.querySelectorAll(".move-to-cart"),e=document.querySelectorAll(".remove-from-wishlist");t.forEach(i=>{i.addEventListener("click",function(){const o=this.dataset.id;l(o)})}),e.forEach(i=>{i.addEventListener("click",function(){const o=this.dataset.id;u(o)})})}function l(t){const e=JSON.parse(localStorage.getItem("cart"))||[],i=n.findIndex(o=>o.id==t);if(i!==-1){const o=n[i],r=e.findIndex(m=>m.id==t);r===-1?e.push({...o,quantity:1}):e[r].quantity+=1,localStorage.setItem("cart",JSON.stringify(e)),n.splice(i,1),localStorage.setItem("wishlist",JSON.stringify(n)),c()}}function u(t){const e=n.findIndex(i=>i.id==t);e!==-1&&(n.splice(e,1),localStorage.setItem("wishlist",JSON.stringify(n)),c())}c()});
