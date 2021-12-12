let btn = document.getElementById('btn');
let chat = document.getElementById('chat');
let online = document.getElementById('conectados')
let usuario = document.getElementById('usuario')
let conectados = document.createElement('p')
const socket = io.connect()

let username = sessionStorage.getItem('usuario');
if(!username){
    username = prompt('ingrese su nombre');
    sessionStorage.setItem('usuario', username)
}
usuario.innerHTML= username ;
socket.on('messages', data => {
    console.log(data)
    render(data)
})

function render(data) {
    data.forEach(msg => {
        let chats = document.createElement('p')
        chats.innerHTML = `Enviado: ${msg.time} De ${msg.author} : ${msg.text}`
        chat.prepend(chats);
    })
}
socket.on('stats', data =>{
    conectados.innerHTML = `Online: ${data.newUsers}`
    online.append(conectados)
})


function addMessage(){
    const message = {
        author : username,
        text : document.getElementById('texto').value
    }
    socket.emit('new-message' , message)
}

btn.addEventListener('click', addMessage)