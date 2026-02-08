async function loadComponent(name_file, name_sel){
    let component = await fetch(name_file)
    let div_cont = document.querySelector(name_sel)
    div_cont.innerHTML = await component.text()
}

async function loadComponent(name_file){
    fetch(name_file).then(function(data){
        return data.json()
    }).then(function(data))
}
function choice(arr) {
    if (!arr.length) {
      throw new Error("Cannot choose from an empty array");
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }