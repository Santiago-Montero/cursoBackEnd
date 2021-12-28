const { options } = require('../options/db.js');
const knex = require('knex')(options)

knex.from('productos').select('*')
.then((rows) => {
    for (const row of rows){
        console.log(`${row['nombre']}`)
    }
})
.catch((error) => console.log(error))
.finally(() => knex.destroy())