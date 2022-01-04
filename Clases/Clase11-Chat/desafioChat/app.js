
class Contenedor {
    constructor(nameTable, options){
        this.nameTable = nameTable,
        this.knex = require('knex')(options)
    }
    crearTabla(){
        this.knex.schema.createTable(this.nameTable, table => {
        table.increments('id')
        table.string('autor')
        table.string('texto')
        table.date('tiempo')
        })
        .then(() => console.log('se creo la tabla'))
        .catch((error) => console.log(error))
    }
    crearTablaProductos(){
        this.knex.schema.createTable(this.nameTable, table => {
            table.increments('id')
            table.string('nombre')
            table.string('foto')
            table.integer('price')
        })
        .then(() => console.log('se creo la tabla'))
        .catch((error) => console.log(error))
    }
    insertarProductos(productos){
        const knex = this.knex
        const name = this.nameTable
        knex(name).insert(productos)
        .then(() => console.log('se agrego la info'))
        .catch((error) => console.log(error))
        
    }
    async listarProductos(){
        let productos = []
        await this.knex.from(this.nameTable).select('*')
        .then((productosDb) => {
            productos = [...productosDb ]
        })
        .catch((error) => console.log(error))
        return productos 
    }
    
    async insertarMensajes(mensajes){
        const knex = this.knex
        const name = this.nameTable
        await knex(name).insert(mensajes)
        .then(() => console.log('se agrego la info'))
        .catch((error) => console.log(error))
        .finally(() => knex.destroy())
    }
    async listarMensajes(){
        let mensajes = []
        await this.knex.from(this.nameTable).select('*')
        .then((mensajesDb) => {
            mensajes = [...mensajesDb]
        })
        .catch((error) => console.log(error))
        
        return mensajes
    }
}

module.exports = Contenedor