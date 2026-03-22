document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html','.footer')

    let seler_data = await loadData("../data/selers.json")
    
    let all_product = await loadData("../data/product.json")
    
    let name_seler = localStorage.getItem("seler")
    all_product = all_product[name_seler]
    seler_data = seler_data["selers"][name_seler]
    console.log(all_product)
    let seler_img = document.querySelector(".cover-seler-img")
    let seler_name = document.querySelector(".cover-seler-text-name")
    let seler_seler = document.querySelector(".cover-seler-text-seler")
    let seler_about = document.querySelector(".cover-seler-text-about")

    seler_img.src = seler_data['image']
    seler_name.innerHTML = seler_data['name']
    seler_about.innerHTML = seler_data['about']
    seler_seler.innerHTML = name_seler

    // додамо картки

})

Filtering();