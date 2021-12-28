const Contenedor = require('./contenedor.js')
const { options } = require('./options/db.js');

const db = new Contenedor('productos', options)

db.listarProductos();