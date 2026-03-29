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

async function opencart(){
  if(document.querySelector(".cart")) {
    return
  }
  else{
  await loadComponent("../components/cart.html", "main")
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
  let total = 0 
  cart.forEach(product => {
    let pr = `        <div class="cart-item">
            <h2 class="item-name">${product.name}</h2>
            
            <div class="chengi">
                <button class="qty-btn" onclick="${subitem(product)}">-</button>
                <span class="item-count">${product.count}</span>
                <button class="qty-btn" onclick="${additem(product)}">+</button>
            </div>
            
            <h3 class="allprise">${product.price*product.count}</h3>
            <button class="delete-btn" onclick="${deleteitem(product)}">🗑</button>
        </div>`
        document.querySelector(".cart-items").innerHTML += pr 
        total += product.price * product.count
  })
  document.querySelector(".total").innerHTML = "Разом: ₴" + total
  }
}
function subitem(product) {
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
  let item = cart.find(el => el.id == product.id)
  if (item){
    item.count -= 1
    if (item.count < 0){
      cart = cart.indexOf(item)
    }
    cart = JSON.stringify(cart)
    localStorage.setItem("cart", cart)
  }
}

function additem(product) {
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
  let item = cart.find(el => el.id == product.id)
  if (item){
    item.count += 1
    cart = JSON.stringify(cart)
    localStorage.setItem("cart", cart)
  }
}

function deleteitem(product) {
  let cart = localStorage.getItem("cart")
  cart = JSON.parse(cart)
  let item = cart.find(el => el.id == product.id)
  if (item){
    cart = cart.indexOf(item)
    cart = JSON.stringify(cart)
    localStorage.setItem("cart", cart)
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
  if(cart) {
  let item = cart.find(el => el.id == product.id)
  if(item){
    item.count += 1
  }
  else{
    cart.push({
        "id": product["id"],
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
            "name": product["name"],
            "price": product["price"],
            "count": 1}
    cart.push(item)
  }
    cart = JSON.stringify(cart)
    localStorage.setItem("cart", cart)


}