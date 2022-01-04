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
const Contenedor = require("./app.js");
const productosDb = new Contenedor('productos_chat', options);
const mensajesDb= new Contenedor('mensajes_chat', options);
/* scripts tablas 
productosDb.crearTablaProductos()
mensajesDb.crearTabla()
productosDb.listarProductos()
productosDb.insertarProductos()
mensajes.listarMensajes()
mensajes.insertarMensajes()
scripts tablas */ 
productosDb.crearTablaProductos()
mensajesDb.crearTabla()

let usersOnline = 0;

io.on('connection', async (socket) => {
    usersOnline ++ ;
    io.emit('stats' , {usersOnline})
    console.log(`cantidad de usuarios : ${usersOnline}`)
    console.log('Nuevo usuario')
    const productos = await productosDb.listarProductos()
    const messages = await mensajesDb.listarMensajes()
    console.log(messages)
    socket.emit('messages', messages)

    socket.emit('productos', productos)

    socket.on('nuevoProducto', async (data) => {
        console.log(data)
        productosDb.insertarProductos(data)
        io.sockets.emit('productos', [data]);
    })
    socket.on('new-message' , async (data) => {
        data.tiempo = new Date().toLocaleTimeString()
        console.log(data)
        await mensajesDb.insertarMensajes(data)
        io.sockets.emit('messages', [data]);
    })
    socket.on('disconnect' , () => {
        usersOnline -- ; 
        io.emit('stats',{usersOnline});
    })
    
});