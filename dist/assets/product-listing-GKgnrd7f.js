const d=document.getElementById("product-list"),f=document.getElementById("sort-options");async function y(){try{const n=await fetch("https://fakestoreapi.com/products");if(!n.ok)throw new Error("Network response was not ok");return await n.json()}catch{return d.innerHTML="<p>Failed to load products. Please try again later.</p>",[]}}function r(n){if(d.innerHTML="",n.length===0){d.innerHTML="<p>No products found.</p>";return}const i=JSON.parse(sessionStorage.getItem("productDiscounts"))||{};n.forEach(t=>{let e=i[t.id];e||(e=Math.floor(Math.random()*16)+5,i[t.id]=e);const a=(t.price*(1-e/100)).toFixed(2),s=document.createElement("div");s.classList.add("product-item"),s.innerHTML=`
      <div class="product-image-wrapper">
        <span class="discount-badge">${e}% OFF</span>
        <img src="${t.image}" alt="${t.title}" width="100">
      </div>
      <h3>${t.title}</h3>
      <p><del>$${t.price}</del> <strong>$${a}</strong></p>
      <div class="product-buttons">
        <button class="like-button" data-id="${t.id}" data-image="${t.image}">🤍</button>
        <button 
          class="quick-view" 
          data-id="${t.id}" 
          data-name="${t.title}" 
          data-image="${t.image}" 
          data-description="${t.description}" 
          data-price="${a}" 
          data-original-price="${t.price}">
          Quick View
        </button>
        <button class="add-to-cart" data-id="${t.id}" data-name="${t.title}" data-price="${a}" data-image="${t.image}">Add to Cart</button>
      </div>
    `,d.appendChild(s)}),sessionStorage.setItem("productDiscounts",JSON.stringify(i)),L(),k(),h(),m()}function h(){const n=document.querySelectorAll(".quick-view"),i=document.getElementById("quick-view-modal"),t=document.getElementById("modal-content");n.forEach(e=>{e.style.display="inline-block",e.addEventListener("click",()=>{const a=e.dataset,s=parseFloat(a.originalPrice||0),o=parseFloat(a.price),c=s?(s-o).toFixed(2):null;t.innerHTML=`
        <span id="close-modal" class="modal-close">&times;</span>
        <h2>${a.name}</h2>
        <img src="${a.image}" alt="${a.name}" width="200">
        <p>${a.description}</p>
        <p>
          <del>$${s.toFixed(2)}</del> 
          <strong>$${o.toFixed(2)}</strong>
        </p>
        ${c?`<p class="discount-flag">You saved: $${c}</p>`:""}
      `,i.style.display="flex"})}),i.addEventListener("click",e=>{(e.target.id==="close-modal"||e.target===i)&&(i.style.display="none")})}function L(){const n=document.querySelectorAll(".like-button"),i=JSON.parse(localStorage.getItem("wishlist"))||[];n.forEach(t=>{const e=t.dataset.id;i.some(s=>s.id===e)&&(t.classList.add("liked"),t.textContent="❤️"),t.addEventListener("click",()=>{const s=t.closest(".product-item"),o=s.querySelector("img").src,c=s.querySelector("h3").innerText,u=s.querySelector("strong").innerText,p={id:e,name:c,price:u,image:o},l=i.findIndex(g=>g.id===e);l===-1?(i.push(p),t.classList.add("liked"),t.textContent="❤️"):(i.splice(l,1),t.classList.remove("liked"),t.textContent="🤍"),localStorage.setItem("wishlist",JSON.stringify(i))})})}function $(n,i=1){const t=JSON.parse(localStorage.getItem("cart"))||[],e=t.findIndex(a=>a.id===n.id);e!==-1?t[e].quantity+=i:(n.quantity=i,t.push(n)),localStorage.setItem("cart",JSON.stringify(t))}function k(){const n=document.querySelectorAll(".add-to-cart"),i=document.getElementById("qty-modal"),t=document.getElementById("qty-input"),e=document.getElementById("qty-confirm"),a=document.getElementById("qty-cancel");let s=null;n.forEach(o=>{o.addEventListener("click",()=>{s={id:o.dataset.id,name:o.dataset.name,price:parseFloat(o.dataset.price),image:o.dataset.image},t.value=1,i.classList.add("show")})}),e.addEventListener("click",()=>{const o=parseInt(t.value)||1;s&&($(s,o),m()),i.classList.remove("show");const c=document.querySelector("#cart-icon");c.classList.add("animated"),setTimeout(()=>c.classList.remove("animated"),600)}),a.addEventListener("click",()=>{i.classList.remove("show"),s=null})}function m(){const i=(JSON.parse(localStorage.getItem("cart"))||[]).reduce((e,a)=>e+(a.quantity||0),0),t=document.getElementById("cart-count");i>0?(t.textContent=i,t.style.display="inline-block",t.classList.remove("pop"),t.offsetWidth,t.classList.add("pop")):t.style.display="none"}document.addEventListener("DOMContentLoaded",async()=>{const n=await y();r(n),f.addEventListener("change",function(){const e=this.value;let a=[...n];e==="name-asc"?a.sort((s,o)=>s.title.localeCompare(o.title)):e==="name-desc"?a.sort((s,o)=>o.title.localeCompare(s.title)):e==="price-asc"?a.sort((s,o)=>s.price-o.price):e==="price-desc"&&a.sort((s,o)=>o.price-s.price),r(a)});const t=new URLSearchParams(window.location.search).get("query");if(t){const e=n.filter(a=>a.title.toLowerCase().includes(t.toLowerCase()));r(e)}});
