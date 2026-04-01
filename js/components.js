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
      if(document.querySelector(".cart")) {
        return
      }
      else{
      await loadComponent("../components/cart.html", "main")

      let cart = localStorage.getItem("cart")
      cart = JSON.parse(cart)
      rendercart(cart)
  

  }
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
  let cart = document.querySelector(".cart")
  let main = document.querySelector("main")
  main.removeChild(cart)
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
}



function sellerall(){
  
}