// server
const express = require('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



app.use(express.static('./views'));

app.get('/', (req, res) => {
    res.send('index.html', { root : __dirname});
})


httpServer.listen(3000, () => console.log('corriendo'));

io.on('connection', (socket) => {
    let now = new Date().toLocaleTimeString();
    console.log('nueva conexion, en la hora => ' + now );

    // socket.emit('santi', 'Buenas estoy en el listener santi god');
    // esto sale en el la consola de google

    // setInterval(() => {
    //     let now2 = new Date().toLocaleTimeString();
    //     socket.emit('santi', 'Buenas estoy en el server y es la hora de envio => ' + now2);
    // }, 2000)

    socket.on('santi', (data) => {
        // socket.emit('santi', data) esto le responde a uno
        io.sockets.emit('santi', data)
    })
    
});