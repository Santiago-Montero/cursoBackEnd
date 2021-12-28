const express = require('express')
const handlebars = require('express-handlebars')
const { Server: HttpServer} = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const PORT = 3000;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
httpServer.listen(process.env.PORT || PORT);

app.engine(
    "handlebars",
    handlebars.engine()
);

app.set('views', './public');
app.set('view engine','handlebars');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./public'));



app.get("/", (req, res) =>{
    res.render('home') 
});

// ---------------------------------
// const Contenedor = require("./file.js");
// const mensajes= new Contenedor('mensajes.json');
const { options } = require('./db/options.js');
const { options2 } = require('./db/options2.js');
const Contenedor = require("./app.js");
const Contenedor2 = require("./app2.js");
const mensajes= new Contenedor('mensajes_chat', options);
const productosDb = new Contenedor2('productos_chat', options2);


const productos = []
const messages =[]

let usersOnline = 0;

io.on('connection', (socket) => {
    usersOnline ++ ;
    io.emit('stats' , {usersOnline})
    console.log(`cantidad de usuarios : ${usersOnline}`)
    console.log('Nuevo usuario')
    socket.emit('messages', messages)

    socket.emit('productos', productos)

    socket.on('nuevoProducto', data => {
        // productos.push(data);
        productosDb.insertarProductos(data)
        io.sockets.emit('productos', [data]);
    })
    socket.on('new-message' , data => {
        data.tiempo = new Date().toLocaleTimeString()
        console.log(data)
        // mensajes.save(data);
        mensajes.insertarMensajes(data)
        // messages.push(data);
        io.sockets.emit('messages', [data]);
    })
    socket.on('disconnect' , () => {
        usersOnline -- ; 
        io.emit('stats',{usersOnline});
    })
    
});