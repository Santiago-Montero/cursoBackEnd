let btn = document.getElementById('btn');
let btnAgregar = document.getElementById('btnAgregar');
let btnM = document.getElementById('btnMail');
let chat = document.getElementById('chat');
let online = document.getElementById('conectados');
let usuario = document.getElementById('usuario');
let conectados = document.createElement('p');
let mail = document.getElementById('mail');
let msg =  document.getElementById('msg');
let titleInput = document.getElementById('title');
let priceInput = document.getElementById('price');
let thumbnailInput = document.getElementById('thumbnail');
let contenedorProductos = document.getElementById('contenedorProductos');
let contenedorMensajes = document.getElementById('mensajesGlobales');
let contenedorMail = document.getElementById('contenedorMail');
contenedorMensajes.style.display = 'none';

let username = sessionStorage.getItem('usuario');
if(!username){
    msg.innerHTML = `Ingrese su mail`;
}else{
    usuario.innerHTML= username ;
    contenedorMail.style.display = 'none';
    contenedorMensajes.style.display = 'block'
}


// **************************************************
const socket = io.connect()


socket.on('productos', data => {
    renderProductos(data)
})


socket.on('messages', data => {
    render(data)
})

function renderProductos(data){
    data.forEach(producto => {

        let contenedorTr = document.createElement('tr')
        contenedorTr.innerHTML = `<td>${producto.title}</td>
                                    <td>${producto.price}</td>
                                    <td><img src=${producto.thumbnail} alt=${producto.thumbnail} width="100" height="auto"></td>`
        contenedorProductos.append(contenedorTr)

    })
}
function render(data) {
    data.forEach(msg => {
        let chats = document.createElement('p')
        chats.innerHTML = `Enviado: ${msg.time} De ${msg.author} : ${msg.text}`
        chat.prepend(chats);
    })
}

socket.on('stats', data =>{
    conectados.innerHTML = `Online: ${data.usersOnline}`
    online.append(conectados)
})


function saveMail(){
    sessionStorage.setItem('usuario',  mail.value)
    username = mail.value
    usuario.innerHTML= username ;
    contenedorMensajes.style.display = 'block'
    contenedorMail.style.display = 'none';
}

function addMessage(){
    const message = {
        author : username,
        text : document.getElementById('texto').value
    }
    socket.emit('new-message' , message)
}



function agregarProducto(){
    const producto = {
        title: titleInput.value,
        price: priceInput.value,
        thumbnail: thumbnailInput.value
    }
    const message = {
        author : username,
        text : 'Agrego un Nuevo producto, es: ' + producto.title
    }
    socket.emit('new-message' , message)
    socket.emit('nuevoProducto' , producto)
}

btnM.addEventListener('click', () => saveMail());
btn.addEventListener('click', () => addMessage());
btnAgregar.addEventListener('click', () => agregarProducto());