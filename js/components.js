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

function opencart(){
  if(document.querySelector(".cart")){
    return
  }
  loadComponent("../component/cart.html","main")
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


  }
  else{
    cart =[]
    let item = {"id":product["id"], 
                "name": product["name"],
              "price": product["price"],
              "count": product("count")}
    cart.push(item)
    cart = JSON.s
  }
}