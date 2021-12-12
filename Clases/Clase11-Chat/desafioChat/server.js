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

const productos = [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]

const getId = () => {
    const pos = productos.length;
    return productos[pos - 1].id + 1
}

app.get("/", (req, res) =>{
    res.render('home', {
        productos,
        productExist : productos.length >= 0 ? true : false
    }) 
});

app.post("/productos", (req, res) =>{
    const productoNuevo = req.body;
    const producto = {
        ...productoNuevo,
        id : getId()
    }
    productos.push(producto)
    res.render('home',{
        productos,
        productExist : productos.length >= 0 ? true : false
    })
});

// ---------------------------------
const Contenedor = require("./file.js");
const mensajes= new Contenedor('mensajes.json');

const messages =[]

let usersOnline = 0;

io.on('connection', (socket) => {
    usersOnline ++ ;
    io.emit('stats' , {usersOnline})
    console.log(`cantidad de usuarios : ${usersOnline}`)
    console.log('Nuevo usuario')
    socket.emit('messages', messages)
    
    socket.on('new-message' , data => {
        data.time = new Date().toLocaleTimeString()
        mensajes.save(data);
        messages.push(data);
        io.sockets.emit('messages', [data]);
    })
    socket.on('disconnect' , () => {
        usersOnline -- ; 
        io.emit('stats',{usersOnline});
    })
    
});