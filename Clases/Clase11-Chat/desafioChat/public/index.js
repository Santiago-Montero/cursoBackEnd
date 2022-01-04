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
    if (data) renderProductos(data)
})


socket.on('messages', data => {
    if (data) render(data)
})

function renderProductos(data){
    data.forEach(producto => {

        let contenedorTr = document.createElement('tr')
        contenedorTr.innerHTML = `<td>${producto.nombre}</td>
                                    <td>${producto.price}</td>
                                    <td><img src=${producto.foto} alt=${producto.foto} width="100" height="auto"></td>`
        contenedorProductos.append(contenedorTr)

    })
}
function render(data) {
    data.forEach(msg => {
        let chats = document.createElement('p')
        chats.innerHTML = `Enviado: ${msg.tiempo} De ${msg.autor} : ${msg.texto}`
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
        autor : username,
        texto : document.getElementById('texto').value
    }
    socket.emit('new-message' , message)
}



function agregarProducto(){
    console.log('hola')
    const producto = {
        nombre: titleInput.value,
        price: priceInput.value,
        foto: thumbnailInput.value
    }
    const message = {
        autor : username,
        texto : 'Agrego un Nuevo producto, es: ' + producto.nombre
    }
    socket.emit('new-message' , message)
    socket.emit('nuevoProducto' , producto)
}

btnM.addEventListener('click', () => saveMail());
btn.addEventListener('click', () => addMessage());
btnAgregar.addEventListener('click', () => agregarProducto());