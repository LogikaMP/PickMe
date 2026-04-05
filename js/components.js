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

function rendercart(cart){
  if(Array.isArray(cart)){
    let total = 0 
     document.querySelector(".cart-items").innerHTML = ""
        cart.forEach(product => {
    let pr = `        <div class="cart-item">
    <div class="left">
            <img  class="item-image" src="${product.image}">
            <h2 class="item-name">${product.name}</h2>
            </div>
            <div class="chengi">
                <button class="qty-btn" onclick='subitem(${JSON.stringify(product)})'>-</button>
                <span class="item-count">${product.count}</span>
                <button class="qty-btn" onclick='additem(${JSON.stringify(product)})'>+</button>
            </div>
            
            <h3 class="allprise">${product.price*product.count}</h3>
            <button class="delete-btn" onclick='deleteitem(${JSON.stringify(product)})'>🗑</button>
        </div>`
        document.querySelector(".cart-items").innerHTML += pr 
        total += product.price * product.count
  })
  document.querySelector(".total").innerHTML = "Разом: ₴" + total
  }
}

async function opencart(){
    
     let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
      document.querySelector('.cart').classList.add('active');
      rendercart(cart)
  

  }

function subitem(product) {
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
  if(Array.isArray(cart)){
      
      let item = cart.find(el => el.id == product.id)
      if (item){
        item.count -= 1
        if (item.count == 0){
          let index = cart.findIndex(el => el.id == product.id)
          cart = cart.splice(index,1)
        }
        rendercart(cart)
        cart = JSON.stringify(cart)
        localStorage.setItem("cart", cart)
      }
    }
 
}

function additem(product) {
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
  if(Array.isArray(cart)){
      
      let item = cart.find(el => el.id == product.id)
      if (item){
        item.count += 1
        rendercart(cart)
        cart = JSON.stringify(cart)
        localStorage.setItem("cart", cart)
      }
  }
  
}

function deleteitem(product) {
  let cart = localStorage.getItem("cart")
  cart = cart ? JSON.parse(cart) : []

  if (!Array.isArray(cart)) return

  let index = cart.findIndex(el => el.id == product.id)

  if (index !== -1) {
    cart.splice(index, 1) // 🔥 видаляємо елемент
    rendercart(cart) // оновлюємо UI
    localStorage.setItem("cart", JSON.stringify(cart))
   
  }
}

function clouscart() {
  document.querySelector('.cart').classList.remove('active');
}

function addtocart(product) {
 
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
 
  if(cart && Array.isArray(cart)) {
  let item = cart.find(el => el.id == product.id)
  if(item){
    item.count += 1
  }
  else{
    cart.push({
        "id": product["id"],
        "image":product['image'],
            "name": product["name"],
            "price": product["price"],
            "count": 1
    })
  }
  }
  else{
    cart = []
    let item = {
              "id": product["id"],
              "image":product['image'],
            "name": product["name"],
            "price": product["price"],
            "count": 1}
    cart.push(item)
  }
    cart = JSON.stringify(cart)
    localStorage.setItem("cart", cart)
    opencart()
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
          <div class="card-category">${product['seller']}</div>
          <div class="card-name">${product['name']}</div>
          <div class="card-price-row">
            <div><span class="card-price">${product['price']}</span><span class="card-price-old">$${product['price']+100}</span></div>
            <div class="card-rating"><span class="stars">★★★★★</span> 4.9</div>
          </div>
        </div>
      </div>
      <div class="flip-back">
        <div class="back-tag">${product['seller']}</div>
        <div class="back-name" >${product['name']}</div>
        <div class="back-desc">${product['about']}</div>
        <div class="back-price"><span class="back-price-main">${product['price']}</span><span class="back-price-period">Free shipping</span></div>
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
  window.location.href = "order.html"
}