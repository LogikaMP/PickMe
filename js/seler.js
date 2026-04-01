let currentIndex = 0
let all_product
document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html','.footer')
    let seler_data = await loadData("../data/selers.json")
  all_product = await loadData("../data/product.json")
    let name_seler = localStorage.getItem("seler")
    let seler_img = document.querySelector(".cover-seler-img")
    let seler_name = document.querySelector(".cover-seler-text-name")
    let seler_seler = document.querySelector(".cover-seler-text-seler")
    let seler_about = document.querySelector(".cover-seler-text-about")
    if (name_seler == "all"){
      if (seler_name) seler_name.remove()
      if (seler_seler) seler_seler.remove()
      if (seler_img) seler_img.remove()
      if (seler_about) seler_about.remove()
      all_product = Object.values(all_product).flat()
    }
    else{
    all_product = all_product[name_seler]
    seler_data = seler_data["selers"][name_seler]
    console.log(all_product)
    seler_img.src = seler_data['image']
    seler_name.innerHTML = seler_data['name']
    seler_about.innerHTML = seler_data['about']
    seler_seler.innerHTML = name_seler
    }
 renderCard()

})

Filtering();

