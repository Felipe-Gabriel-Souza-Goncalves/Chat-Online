var user = "anonimo"

function cadastrar(){
    inputUsuario = document.getElementById("user").value
    if(inputUsuario.trim() == ""){
        return
    }
    localStorage.setItem("user", inputUsuario)
}

function logar(){
    if(localStorage.getItem("user") != null){
        user = localStorage.getItem("user")
    } else{
        user = "anonimo"
    }
}

function enviarMensagem(){
    document.getElementById("caixaEnviar").disabled = true
    mensagem = document.getElementById("caixaEnviar").value
    fetch('https://raw.githubusercontent.com/Felipe-Gabriel-Souza-Goncalves/Chat-online/refs/heads/main/chat.json', {
        method: 'POST', //Metodo POST HTTP
        headers: {
            'Content-Type': 'application/json' //Tipo de conteudo enviado JSON
        },
        body: JSON.stringify({usuario: localStorage.getItem("user"), mensagem: mensagem}) //Dados a serem enviados e convertidos
    })
    .then(resposta => resposta.JSON)
    .then(() =>{
        setTimeout(() =>{
            document.getElementById("caixaEnviar").disabled = false
            carregarMensagem()
        }, 100)
        
    })
}

function carregarChat(){
    if(localStorage.getItem("user") != null){
        document.getElementById("chat").style.display = "flex"
        document.getElementById("cadastro").style.display = "none"
    }
    fetch("https://raw.githubusercontent.com/Felipe-Gabriel-Souza-Goncalves/Chat-online/refs/heads/main/chat.json").then(r => r.json()).then(msg =>{
        msg.forEach(element => {
            var div = document.createElement("div")
            div.classList.add("mensagem")
            var user = document.createElement("h3")
            user.innerHTML = element.usuario + " disse:"
            var msg = document.createElement("p")
            msg.innerHTML = element.mensagem 

            div.appendChild(user)
            div.appendChild(msg)
            document.getElementById("mensagens").appendChild(div)
        });
    })
}

logar()
carregarChat()