let currentIndex = 0
let all_product
document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('./components/header.html', '.header')
    await loadComponent('./components/footer.html','.footer')
     await loadComponent('./components/cart.html','.div-cart')
    all_product = await loadData("./data/product.json")
    all_product = Object.values(all_product).flat()
    let request = localStorage.getItem("request")
    let request_product = []
    request_product = all_product.filter(product => 
      product.name.toLowerCase().includes(request.toLowerCase())||
      product.seler.toLowerCase().includes(request.toLowerCase())
      )

      renderCard(request_product , true)
})
