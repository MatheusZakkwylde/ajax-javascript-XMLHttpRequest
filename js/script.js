//Verifca se a página foi toda carregada.
window.onload = function(){
    //função generica de ajax passando o método GET ou POST a url de envio e os dados caso exista dependendo da requisição
    function ajaxResponse (method,url,data){
        //Criação do objeto ajax
        let ajax = new XMLHttpRequest()
            //passando o método requisitado a url e o true para ser um envio asicrono
            ajax.open(method,url,true)
            //se for post, crie o cabeçalho da requisição e passe o objeto data para o envio
            if(method === 'POST'){
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                ajax.send(data) 
            //se não, apenas faz o envio em caso de método get ou qual seja.
            }else{
                ajax.send() 
            }
            
            //Retorna o obejto ajax após feito a solitação.
            return ajax
    }

    //Chamada do ajax por GET.
    
    //Pega o elemento botão a ser acionado.
    let btn =  document.querySelector("#btn")
   //verifica a função de está clicado e chama a ação.
    btn.addEventListener("click",function(){
        let data = document.querySelector("#data")
        //chama a função generica passando o método GET a url sendo o arquivo local e o data vazio
        let ajax = ajaxResponse('GET','/js/data.json','')
        
        //Verificação se está tudo certo.
        ajax.onreadystatechange = function(){
            //Se o status da requisição for igual a 200 e o readyState for igual a 4 está tudo ok
            if(ajax.status ===  200 && ajax.readyState === 4){
                //recebe o resultado da requisição e transforma em json
                 let response = JSON.parse(ajax.responseText)
                 //pega a lista de objetos car
                 let car = response.car
                 //aplica um foreach (loop) criando elementos p e adiconando o texto colo a cada tag b
                 //O elemento data é o elemento onde todas as tags Ps com o resultado será adicionado.
                 for (let key in car) {
                    let element = document.createElement("p")
                    let textnode = document.createTextNode(car[key].color);  
                    element.appendChild(textnode); 
                    data.appendChild(element)
                }
            }
        }
    })   


    let form = document.querySelector('#form')

    form.addEventListener('submit',function(event){
         event.preventDefault()

         let data = {
             name : document.querySelector('#name'),
             job : document.querySelector('#job')
         }

         let ajax = ajaxResponse ('POST','https://reqres.in/api/users',data)

         ajax.onreadystatechange = function(){
            if(ajax.status ===  201 && ajax.readyState === 4){
                 let response = JSON.parse(ajax.responseText)
                 console.log(response)
            }
        }
    })
}
