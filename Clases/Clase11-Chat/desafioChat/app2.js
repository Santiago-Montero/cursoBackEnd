
class Contenedor2 {
    constructor(nameTable, options){
        this.nameTable = nameTable,
        this.knex = require('knex')(options)
    }
    crearTabla(){
        this.knex.schema.createTable(this.nameTable, table => {
            table.increments('id')
            table.string('nombre')
            table.string('foto')
            table.integer('price')
        })
        .then(() => console.log('se creo la tabla'))
        .catch((error) => console.log(error))
        .finally(() => this.knex.destroy())
    }
    insertarProductos(productos){
        (this.knex)(this.nameTable).insert(productos)
        .then(() => console.log('se agrego la info'))
        .catch((error) => console.log(error))
        .finally(() => this.knex.destroy())
    }
    listarProductos(){
        (this.knex).from(this.nameTable).select('*')
        .then((rows) => {
            for (const row of rows){
                console.log(row)
            }
        })
        .catch((error) => console.log(error))
        .finally(() => this.knex.destroy())
    }
}

module.exports = Contenedor2