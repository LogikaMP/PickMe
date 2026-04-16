async function loadComponent(name_file, name_sel){
    let component = await fetch(name_file)
    let div_cont = document.querySelector(name_sel)
    div_cont.innerHTML += await component.text()
}

async function loadData(name_file){
    let file = await fetch(name_file)
    let data_file = await file.json()
    return data_file
}

function choice(arr) {
  if (!arr.length) {
    throw new Error("Cannot choose from an empty array");
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function search(event){
  if (event.key == "Enter"){
    let request = document.querySelector(".search").value
    localStorage.setItem("request",request)
    window.location.href ="search.html"
  } 
}
function renderCard(all_product, reset = false){
  if (reset) {
    currentIndex = 0;
    document.querySelector(".allwrps").innerHTML = "";
  }
  let slice = all_product.slice(currentIndex,currentIndex + 9)
  let allwrps = document.querySelector(".allwrps")
    slice.forEach(product =>{
        let card =
         `<div class="flip-card2 card-a single"  data-menu="${product['data-menu']}" onclick ="show_product(${JSON.stringify(product)})">
    <div class="flip-inner">
      <div class="flip-front">
        <div class="card-img2">
          <div class="card-img-bg"></div>
          
          <span class="card-emoji" ><img src= "${product['image']}"></span>
        </div>
        <div class="card-info">
          <div class="card-category">${product['seler']}</div>
          <div class="card-name">${product['name']}</div>
          <div class="card-price-row">
            <div><span class="card-price">${product['price']}$ </span><span class="card-price-old">$${product['price']+100}</span></div>
            
          </div>
        </div>
      </div>
      <div class="flip-back">
        <div class="back-tag">${product['seler']}</div>
        <div class="back-name" >${product['name']}</div>
        <div class="back-desc">${product['about']}</div>
        <div class="back-price"><span class="back-price-main">${product['price']}$</span></div>
        <div style="display:flex;justify-content:space-between;">
        <button class="back-cta" onclick = 'addtocart(${JSON.stringify(product)})'>До кошику</button>
         <button class="back-cta" onclick = 'show_product(${JSON.stringify(product)})'>Детальніше</button>
      </div>
         </div>
    </div>
  </div>`
  allwrps.innerHTML += card
    })
    currentIndex +=9
    if (currentIndex < all_product.length){
      if (document.getElementById("loadMore"))return
        document.querySelector(".filter-seler").innerHTML += `<button id="loadMore">Завантажити ще</button>`
        document.getElementById("loadMore").onclick = () => renderCard(all_product);
      }
      else{
        let btn = document.getElementById("loadMore")
        if (btn) btn.remove()
      }
    }
function show_product(product){
  localStorage.setItem("product", JSON.stringify(product))
  window.location.href = "product.html"
}

function dealmake(){
      let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)
   
    if(cart && Array.isArray(cart) && cart.length > 0) {
  window.location.href = "order.html"
    }
}
window.addEventListener("DOMContentLoaded", () => {
const observer = new IntersectionObserver(elements => {
  elements.forEach(el => {
    if (el.isIntersecting){
      el.target.classList.add("observer-show")
      observer.unobserve(el.target)
    }
  })
}, {
  threshold: 0.4
})

document.querySelectorAll(".observer-hide").forEach(el => {
  observer.observe(el)
})
})