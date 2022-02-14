let nome = ""
let nomeOnline = {}
function processarResposta() {
    let nomeOnline = document.querySelector(".chat")
    
    let nav = document.querySelector(".entrada")
    nav.classList.toggle('visivel')
    setInterval(chatOnline,5000)
}
function chatOnline () {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nomeOnline);
    console.log('bunts')
}
function errorNome () {
    alert('tente outro nome')
    console.log('bunts')
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