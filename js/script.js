window.onload = function(){
    let btn = document.querySelector("#btn")
    let data = document.querySelector("#data")

    btn.addEventListener("click",function getResponse(){
        let ajax = new XMLHttpRequest()
        ajax.open('GET','/js/data.json')
    
        ajax.onreadystatechange = function(){
            if(ajax.status ===  200 && ajax.readyState === 4){
                let response = JSON.parse(ajax.responseText)
                let car = response.car
                
                for (let key in car) {
                    let element = document.createElement("p")
                    let textnode = document.createTextNode(car[key].color);  
                    element.appendChild(textnode); 
                    data.appendChild(element)
                }
            }
        }
        ajax.send()   
    })
}
