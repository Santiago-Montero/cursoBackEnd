// cliente
const socket = io();

// 'santi' es un socket
socket.on('santi', (data) => {
    let contenerdor = document.createElement('p')
    contenerdor.innerHTML = `${data}`
    msj.appendChild(contenerdor)
    console.log(data)
})

let btn = document.getElementById('btn');
let msj = document.getElementById('mensajes');
let chat = document.getElementById('chat');

btn.addEventListener('click' , () => {
    let now = new Date().toLocaleTimeString();
    let msj =  'enviado: '+ now + ' mensaje: ' + chat.value;

    socket.emit('santi', msj);

    chat.value = ''
})
// mensajes q le mando al server (en la consola de visual se ven)

// setInterval(() => {
//     let now2 = new Date().toLocaleTimeString();
//     socket.emit('santi', 'Buenas estoy en el cliente y es la hora de envio => ' + now2);
// }, 2000)