
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
        .finally(() => this.knex.destroy())
    }
    insertarMensajes(mensajes){
        (this.knex)(this.nameTable).insert(mensajes)
        .then(() => console.log('se agrego la info'))
        .catch((error) => console.log(error))
        .finally(() => this.knex.destroy())
    }
    listarMensajes(){
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

module.exports = Contenedor