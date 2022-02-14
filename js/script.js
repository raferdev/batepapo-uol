let nome = "";
let nomeOnline = {};
let chatMsgs = {};
let participantes = {};
let para = "Todos"
let tipo = "message"
let chatOnlineNovo = []
let listaParticipantes = document.querySelector(".sidebarOnlineUserConainer");
let listaChat = document.querySelector(".chat");

function processarResposta() {
    let entrada = document.querySelector(".entrada")
    const promisseChatMsgs = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    entrada.classList.toggle('visivel')
    setInterval(carregarParticipantes, 5000)
    setInterval(chatOnline,5000)
    setInterval(carregarChat,5000)
    aplicarStatus()
}
function carregarParticipantes() {
    let pParticipantes = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    pParticipantes.then(funcaoParticipantes)
}
function funcaoParticipantes (pParticipantes) {
    participantes = pParticipantes.data
    listaParticipantes.innerHTML = ""
    participantes.forEach(funcaoAddParticipantes)
}
function funcaoAddParticipantes (participante) {
        listaParticipantes.innerHTML += `<div class="sidebarOnlineUser ${participante.name}" onclick = "selectionUser('${participante.name}')"><div class="sidebarLines"><ion-icon name="person-circle"></ion-icon><p class="sidebarTxt">${participante.name}</p></div><ion-icon class="iconCheck" name="checkmark"></ion-icon></div>`
    }

function selectionUser(destinatario) {
    para = destinatario
    let elemento = document.querySelector("."+ para + " .iconCheck")
    elemento.classList.add("check")
}
function carregarChat() {
    let promisseChatMsgs =  axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promisseChatMsgs.then(printarChat)
}
function printarChat(pChatOnline) {
    chatOnlineNovo = pChatOnline.data
    listaChat.innerHTML = ""
    chatOnlineNovo.forEach(addChat)
}
function addChat(msgsChat){
    listaChat.innerHTML += `<div class="msg"><div class = "hora">${msgsChat.time}</div><div class = "nome">${msgsChat.from}</div><div class = "para">para </div><div class = "quem">${msgsChat.to}:</div><div class="textoMsg">${msgsChat.text}</div></div>`   
}
function aplicarStatus() {
    let status = document.querySelector(".chat")
    status.innerHTML += `<div class="msg chatStatus"><div class = "hora">testehora</div><div class = "nome">${nome}</div><div class="textoMsg">entrou na sala...</div></div>`
    status.scrollIntoView()
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
function enviarMsg() {
    let msgTxT = document.querySelector(".msgInput").value
    let msg = {
        from: nome,
        to: para,
        text:msgTxT,
        type:tipo,
    };
    console.log(msg)
    axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", msg);
    document.querySelector(".msgInput").value = ''
}