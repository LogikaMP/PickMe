document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('./components/header.html', '.header')
    await loadComponent('./components/footer.html','.footer')
    document.getElementById("btn-cart").remove()
    let cart = localStorage.getItem("cart")
    cart = cart ? JSON.parse(cart) : []
    rendercartOrder(cart)
})

function rendercartOrder(cart){
  if(Array.isArray(cart)){
    let total = 0 
     document.querySelector(".cart-items").innerHTML = ""
        cart.forEach(product => {
    let pr = `        <div class="cart-item">
    <div class="left">
            <img  class="item-image" src="${product.image}">
            <h2 class="item-name">${product.name}</h2>
            </div>
            <div class="order-price">
                
                <span class="item-count">Кількість: ${product.count}</span>
                <h3 class="allprise">Ціна: ₴${(product.price*product.count).toFixed(2)}</h3>
            </div>
            
            
            
        </div>`
        document.querySelector(".cart-items").innerHTML += pr 
        total += product.price * product.count
  })
  document.querySelector(".total").innerHTML = "Разом: ₴" + total
  }
}

let form = document.querySelector("form")
form.addEventListener("submit", function(e){
if(!form.checkValidity()){
    e.preventDefault()
    alert("Заповніть форму!")

}
else{
    e.preventDefault()
    document.querySelector(".order-container").innerHTML = `<div class="order-complete observer-hide">
    <h2>Замовлення оформлено!</h2>
    <p class="order-number">Номер вашого замовлення: <strong>№${randomInt(100000, 999999)}</strong></p>
    <p class="thank-you">
        Дякуємо за ваше замовлення! Ми цінуємо ваш вибір і довіру.
    </p>
    <p class="info">
        Найближчим часом з вами зв’яжеться наш менеджер, щоб уточнити деталі.
    </p>
</div>`
}
})
