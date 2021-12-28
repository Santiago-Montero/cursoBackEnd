const { options } = require('../options/db.js');
const knex = require('knex')(options)

const productos = [
    {
        nombre: "Escuadra",
        price: 123.45,
        stock: 10,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        nombre: "Calculadora",
        price: 234.56,
        stock: 10,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        nombre: "Globo Terráqueo",
        price: 345.67,
        stock: 10,
        foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]

knex('productos').insert(productos)
.then(() => console.log('se agrego la info'))
.catch((error) => console.log(error))
.finally(() => knex.destroy())