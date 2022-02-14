let nome = ""
let nomeOnline = {}
let chatMsgs = {}
let pParticipantes = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    pParticipantes.then(carregarParticipantes)

function processarResposta() {
    let entrada = document.querySelector(".entrada")
    const promisseChatMsgs = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    entrada.classList.toggle('visivel')
    setInterval(chatOnline,5000)
    aplicarStatus()
}
function carregarParticipantes(participantes) {
    let listaParticipantes = document.querySelector(".sidebarOnlineUserConainer");
    console.log(participantes.length)
    for (let i = 0; i < participantes.length; i++) {
        console.log("1")
        listaParticipantes.innerHTML += `<div class="sidebarOnlineUser"><div class="sidebarLines"><ion-icon name="person-circle"></ion-icon><p class="sidebarTxt">${participantes[i].name}</p></div><ion-icon class="iconCheck" name="checkmark"></ion-icon></div>`
    }
}

function charregarChat(promisseChatmsgs) {
    chatMsgs = promisseChatMsgs
}
function aplicarStatus() {
    let status = document.querySelector(".chat")
    status.innerHTML += `<div class="msg chatStatus"><div class = "hora">testehora</div><div class = "nome">${nome}</div><div class="textoMsg">entrou na sala...</div></div>`
}
function chatOnline () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nomeOnline);
}
function errorNome () {
    alert('tente outro nome')
}
function navVisivel () {
    let nav = document.querySelector(".nav")
    nav.classList.toggle('visivel')
}
function entradaVisivel () {
    nome = document.querySelector(".nameInput").value
    nomeOnline = {
    name: nome };
    const requisicaoNome = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nomeOnline);
    requisicaoNome.then(processarResposta);
    requisicaoNome.catch(errorNome)
}