document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html', '.footer')
    
    let all_seler_data = await loadData("../data/seler.json")
    let all_product = await loadData("../data/product.json")
    let name_seler = localStorage.getItem("seler")
    all_product = all_product[name_seler]
    seler_data = seler_data['selers'][name_seler]
    let seler_img = document.querySelector(".seler-img")
    let seler_text_name = document.querySelector(".seler-name")
    let seler_about = document.querySelector(".seler-about")

})