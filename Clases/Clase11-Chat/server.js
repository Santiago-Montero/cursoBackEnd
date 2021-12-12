// server
//npm install express socket.io
const express = require('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('index.html', { root : __dirname});
})


httpServer.listen(3000, () => console.log('corriendo'));


const messages =[
    {author: "santi", text: "hola"},
    {author: "oli", text: "buenas "},
    {author: "santi", text: "como estas"},
    {author: "oli", text: " bien"},
    {author: "santi", text: "chau"}
]

let newUsers = 0;

io.on('connection', (socket) => {
    newUsers ++ ;
    io.emit('stats' , {newUsers}) // manda stats
    console.log(`cantidad de usuarios : ${newUsers}`)
    console.log('Nuevo usuario')
    socket.emit('messages', messages) // manda mensajes
    
    socket.on('new-message' , data => { // a la escucha de nuevos mensajes por parte del cliente
        data.time = new Date().toLocaleTimeString()
        messages.push(data)
        io.sockets.emit('messages', [data])
    })
});