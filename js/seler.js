document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')
    await loadComponent('../components/footer.html','.footer')

    let seler_data = await loadData("../data/selers.json")
    let all_product = await loadData("../data/product.json")
    let name_seler = localStorage.getItem("seler")
    all_product = all_product[name_seler]
    seler_data = seler_data["selers"][name_seler]
    let seler_img = document.querySelector(".seler cover img")
    let seler_name = document.querySelector(".seler cover text name")
    let seler_about = documrnt.querySelector(".seler cover text about ")
