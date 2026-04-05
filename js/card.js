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

