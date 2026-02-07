async function loadComponent(name_file,name_sel){
    let component = await fetch(name_file)
    let div_cont = document.querySelector(name_sel)
    div_cont.innerHTML = await component.text()
    

}