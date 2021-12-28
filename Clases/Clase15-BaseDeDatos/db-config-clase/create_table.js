const { options } = require('../options/db.js');
const knex = require('knex')(options)

// identidad, para crear tablas 
knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('nombre')
    table.string('foto')
    table.integer('stock')
    table.integer('price')
})
.then(() => console.log('se creo la tabla'))
.catch((error) => console.log(error))
.finally(() => knex.destroy())