const express = require('express')
const normalizr = require('normalizr')
const { normalize, schema } = normalizr
const faker = require('faker')
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

const productosRandom = []

for (let i = 0; i < 5; i++) {
    let productoRandom ={
        nombre : faker.commerce.productName(),
        precio : faker.commerce.price(),
        foto : faker.image.image()
    }
    productosRandom.push(productoRandom)
}
console.log(productosRandom)

app.get("/productos-test", (req, res) =>{
    res.render('home', {
        productos : productosRandom, 
        show: productosRandom.length > 6 ? true : false
    })
});

// ---------------------------------

const util = require('util')
const Contenedor2 = require("./file.js");
const mensajesJSON = new Contenedor2 ('mensajes.json');
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
scripts tablas  
productosDb.crearTablaProductos()
mensajesDb.crearTabla()*/

function imprimir (obj){
    console.log(util.inspect(obj, false, 12, true))
}
async function cargarMensajes(){
    const mensajes = await mensajesJSON.read()
    const texto = new schema.Entity('texto');
    const autor = new schema.Entity('autor');
    const mensajeNormalizr = new schema.Entity('mensajeNormalizr',{
        autor : autor,
        texto : texto
    });
    const mensajesNormalizr = new schema.Entity('mensajesNormalizr', {
        mensajesNormalizr : [mensajeNormalizr]
    })
    const normalizedMensajes = normalize(JSON.parse(mensajes), mensajesNormalizr);
    imprimir(normalizedMensajes)
}
cargarMensajes()
// no sabia como hacer lo de compresion 
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
        await mensajesJSON.save(data) // se guarda en el archivo .json
        await mensajesDb.insertarMensajes(data)
        io.sockets.emit('messages', [data]);
    })
    socket.on('disconnect' , () => {
        usersOnline -- ; 
        io.emit('stats',{usersOnline});
    })
    
});