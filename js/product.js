document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html','.footer')
    let product = localStorage.getItem("product")
    product = JSON.parse(product)
    let response = await loadData("../data/response.json")
    response = response.filter(item => item.id == product.id)
    let pr = `<div class="product">
    <img src="${product.image}" alt="Товар">

    <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-title">${product.seler}</div>
        <div class="product-description">
            ${product.about}
        </div>

        <div class="product-price">${product.price}</div>

        <button class="btn" onclick='addtocart(${JSON.stringify(product)})'>Додати у кошик</button>
    </div>
</div>`
document.querySelector("main").innerHTML += pr
document.querySelector("main").innerHTML += "<div class='reviews'> <h2>Відгуки</h2></div>"
response.forEach(res => {
    let r = `<div class="review">
    <div class="review-name">${res.name}</div>
    <div class="review-text">${res.response}</div>
</div>`
document.querySelector(".revievs").innerHTML += r
})
})