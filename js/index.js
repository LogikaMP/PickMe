document.addEventListener("DOMContentLoaded", function(){
    loadComponent('../components/header.html', '.header')


    let all_product
    loadData('../data/all_product.json').then(function(obg){
        all_product = obg
    })
    console.log(all_product)
})

// 6 6 - https://codepen.io/Forte_high/pen/RNRNzPQ 
